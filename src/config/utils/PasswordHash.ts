import bcrypt from "bcryptjs"

class PasswordHash {
    public static hash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10)
    }
}

export default PasswordHash