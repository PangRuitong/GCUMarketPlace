import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid';

const getProcessingTimeInMS = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`;
};

export default function logger(req: Request, res: Response, next: NextFunction) {
    const id = uuidv4();

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}-${now.getSeconds()}`;

    const { method, url } = req;
    const start = process.hrtime();

    console.log(`[${id}][${timestamp}] ${method}:${url} START:${getProcessingTimeInMS(start)}`);

    res.once('finish', () => {
        const end = process.hrtime(start);
        console.log(`[${id}][${timestamp}] ${method}:${url} ${res.statusCode} END:${getProcessingTimeInMS(end)}`);
    });

    next();
}
