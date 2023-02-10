use rand::seq::IteratorRandom;
use std::collections::HashMap;

pub struct EmptyTextError;

pub struct Hasher {}

impl Hasher {
    pub fn gen_tcoi(self) -> String {
        let mut rng = rand::thread_rng();
        let letters =
            String::from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.");
        let mut code = String::from("Q-");

        for _ in 0..28 {
            code.push(letters.chars().choose(&mut rng).unwrap());
        }

        return code;
    }

    pub fn get_tcoi(self, text: String) -> Result<HashMap<String, String>, EmptyTextError> {
        if text.trim() == String::from("") {
            return Err(EmptyTextError);
        } else {
            let code = self.gen_tcoi();

            let hashmap: HashMap<String, String> = HashMap::from([(text, code)]);

            return Ok(hashmap);
        }
    }
}
