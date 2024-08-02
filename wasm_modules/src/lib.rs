use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn renderpage(totalcount: i32) -> String {
    // Return the inner rendered HTML
    let mut res = String::new();
    // Split the template
    res.push_str("<span style=\"color: cyan;\">");
    res.push_str(&format!("{}", totalcount));
    res.push_str("</span>");
    res
}
