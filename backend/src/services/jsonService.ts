import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

export const readData = () => {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({ users: [], tasks: [] }));
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
};

export const writeData = (data: any) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
