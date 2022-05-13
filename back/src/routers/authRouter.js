import { Router } from 'express';
import { KakaoService } from '../services/KakaoService';

const authRouter = Router();

authRouter.get('/auth/kakao', async (req, res, next) => {
    try {
        const code = req.query.code.slice(0, -1);
        const user = await KakaoService.getToken(code);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});
