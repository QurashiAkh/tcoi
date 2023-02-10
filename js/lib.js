import fs from 'fs/promises';

export class Hasher {
    gen_tcoi = () => {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
        let code = "Q-"

        for (let i = 0; i < 28; i++) {
            let randomLetter = letters[Math.floor(letters.length * Math.random())];
            code += randomLetter
        }

        return code
    }

    check_hashfile = async () => {
        try {
            await fs.access('.hashfile')
        } catch {
            await fs.writeFile('.hashfile', '')
        }
    }

    get_tcoi = async text => {
        if (text.trim() === "") {
            return "NO TEXT PROVIDED!"
        } else {
            await this.check_hashfile()

            try {
                let returnedText = text;
                let returnedCode = '';

                const hashfileContent = (await fs.readFile('.hashfile')).toString()

                const lines = hashfileContent.split("\n")

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    returnedText = line.substring(0, line.lastIndexOf(": "));
                    returnedCode = line.substring(line.lastIndexOf(": ") + 2, line.length);

                    if (text === returnedText) {
                        return { text: returnedText, tcoi: returnedCode }
                    }

                    if (returnedCode === '') {
                        returnedCode = this.gen_tcoi()

                        await fs.appendFile('.hashfile', `${text}: ${returnedCode}\n`)

                        return { text: text, tcoi: returnedCode }
                    }
                }
            } catch (e) {
                return "UNABLE TO READ HASHFILE!" + e
            }
        }
    }
}
