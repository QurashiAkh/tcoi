use std::io::{self, Write};

use tcoi::Hasher;

fn main() {
    let mut input_text = String::new();

    print!("Q>>> ");
    io::stdout().flush().unwrap();

    io::stdin()
        .read_line(&mut input_text)
        .expect("UNEXPECTED INPUT!");

    let text = input_text.trim().to_string();

    let hasher = Hasher {};

    match hasher.get_tcoi(text.clone()) {
        Ok(hashmap) => println!("{}: {}", text, hashmap[&text]),
        Err(_) => println!("ERROR: EMPTY TEXT!"),
    }
}
