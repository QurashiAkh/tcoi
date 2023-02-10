use rand::seq::IteratorRandom;
use std::{
    collections::HashMap,
    fs::{self, File, OpenOptions},
    io::Write,
    path::Path,
};

pub struct EmptyTextError;

pub struct Hasher {}

impl Hasher {
    pub fn gen_tcoi(&self) -> String {
        let mut rng = rand::thread_rng();
        let letters =
            String::from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.");
        let mut code = String::from("Q-");

        for _ in 0..28 {
            code.push(letters.chars().choose(&mut rng).unwrap());
        }

        return code;
    }

    fn check_hashfile(&self) {
        // If .hashfile isn't available then create one

        let hashfile_path = Path::new(".hashfile");

        if !Path::exists(&hashfile_path) {
            File::create(".hashfile").expect("UNABLE TO CREATE HASHFILE!");
        }
    }

    pub fn get_tcoi(&self, text: String) -> Result<HashMap<String, String>, EmptyTextError> {
        if text.trim() == String::from("") {
            return Err(EmptyTextError);
        } else {
            let mut code = String::new();

            self.check_hashfile();

            let hashfile_content =
                fs::read_to_string(".hashfile").expect("UNABLE TO READ HASHFILE!");

            for line in hashfile_content.split("\n") {
                let found_vec = match line.rsplit_once(": ") {
                    Some(found_vec) => found_vec,
                    None => ("NONE FOUND!", "NONE FOUND!"),
                };

                if found_vec.1.starts_with("Q-") {
                    if found_vec.0 == text {
                        code = found_vec.1.to_string();
                        break;
                    }
                }
            }

            if code == "" {
                code = self.gen_tcoi();

                let mut hashfile = OpenOptions::new()
                    .append(true)
                    .open(".hashfile")
                    .expect("UNABLE TO OPEN HASHFILE!");

                writeln!(hashfile, "{}: {}", text, code).expect("UNABLE TO WRITE INTO HASHFILE!");
            }

            let hashmap: HashMap<String, String> = HashMap::from([(text, code)]);

            return Ok(hashmap);
        }
    }
}
