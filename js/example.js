import { Hasher } from 'tcoi';

const hasher = new Hasher()

const result = await hasher.getTcoi("nice")
console.log(result)

const result2 = await hasher.getTcoi("nice")
console.log(result2)

if (result.tcoi === result2.tcoi) {
    console.log("WORKS!")
} else {
    console.log("SOMETHING GOT MESSED UP..")
}
