import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default class HashPassword {
    
    hashPassword = (password: string) => {
        return bcrypt.hashSync(password);
    };

    comparePassword = (password: string, passwordStored: string) => {
        return bcrypt.compareSync(password, passwordStored);
    };
};
