import fs from 'fs/promises';

export class Hasher {
    genTcoi = () => {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
        let code = "Q-"

        for (let i = 0; i < 28; i++) {
            let randomLetter = letters[Math.floor(letters.length * Math.random())];
            code += randomLetter
        }

        return code
    }

    checkHashfile = async () => {
        try {
            await fs.access('.hashfile')
        } catch {
            await fs.writeFile('.hashfile', '')
        }
    }

    clearHashfile = async () => {
        await this.checkHashfile()

        await fs.truncate('.hashfile', 0);
    }

    getAllCodes = async () => {
        let results = []

        const hashfileContent = (await fs.readFile('.hashfile')).toString()

        const lines = hashfileContent.split("\n")

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            let text = line.substring(0, line.lastIndexOf(": "));
            let code = line.substring(line.lastIndexOf(": ") + 2, line.length);

            if (code != '') {
                results.push({ text: text, tcoi: code })
            }
        }

        return results
    }

    getTcoi = async text => {
        if (text.trim() === "") {
            return "NO TEXT PROVIDED!"
        } else {
            await this.checkHashfile()

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
                        returnedCode = this.genTcoi()

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
