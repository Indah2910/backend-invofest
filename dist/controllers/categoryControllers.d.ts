import { Request, Response } from "express";
export declare const getcategory: (req: Request, res: Response) => Promise<void>;
export declare const createcategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getcategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatecategory: (req: Request, res: Response) => Promise<void>;
export declare const deletecategory: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=categoryControllers.d.ts.map