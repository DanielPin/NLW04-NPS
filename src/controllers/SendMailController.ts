import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import {resolve} from 'path';

class SendMailController{
    async execute(request: Request, response: Response){
        const {email, survey_id} = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if(!userAlreadyExists){
            return response.status(400).json({
                error: "User does not exists"
            });
        };

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id})

        if(!surveyAlreadyExists){
            return response.status(400).json({
                error: "Survey does not exists"
            });
        };       

      

        const npsPath = resolve(__dirname,"..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: { user_id: userAlreadyExists.id, value: null },
            relations: ["user", "survey"]
        });

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            id: "",
            link: process.env.URL_MAIL
        };

        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }
        // Salvar as informações na tabela surveysUser

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: surveyAlreadyExists.id
        });

        await surveysUsersRepository.save(surveyUser);
        variables.id = surveyUser.id;

        // Enviar e-mail para o usuário            

        await SendMailService.execute(email, surveyAlreadyExists.title ,variables, npsPath);

        return response.json(surveyUser);

    }
}

export { SendMailController }