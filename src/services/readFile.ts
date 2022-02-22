import fs from "fs";

function ReadFile(path: string): Array<String> {
  try {
    const file = fs.readdirSync(path);
    for (let index = 0; index < file.length; index++) {
      const input = file[index];
      if (input === "input.txt") {
        file[0] = input;
      }
    }

    const file_content_raw = fs.readFileSync(`${path}/${file[0]}`, "utf8");
    const file_content = file_content_raw.split(/\r?\n/).filter((item) => {
      return item;
    });

    if (file_content === [""]) return ["error", "No such file or directory"];

    return file_content;
  } catch (error) {
    return ["error", "No such file or directory"];
  }
}

export { ReadFile };
