import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  let [text, setText] = useState("Copy");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let strng = "ABCDEFGHIJKLMNOPQRSTUVWRSTUVWXYZabcdefghijklmnopqrstuvw";
    if (numAllow) {
      strng += "0123456789";
    }
    if (charAllow) {
      strng += "!@#$%^&*()+=";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * strng.length + 1);
      pass += strng.charAt(char);
    }
    setPassword(pass);
    setText("Copy");
  }, [length, numAllow, charAllow, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setText("Copyied");
  }, [password, text]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, charAllow, passwordGenerator]);
  return (
    <>
      <div className="w-screen h-full ">
        <div className="flex flex-col items-center bg-zinc-600 mx-56 mt-10 pb-10 rounded-lg">
          <h1 className="text-4xl font-semibold text-center pt-10">
            Password Genertor
          </h1>
          <div>
            <input
              type="text"
              value={password}
              className=" pl-3 outline-none font-black text-orange-500 w-96 py-1 mt-10 rounded-l"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-800 py-1 px-4 rounded-r"
              onClick={copyPassword}
            >
              {text || copy}
            </button>
          </div>
          <div className="mt-5 flex items-center ">
            <input
              type="range"
              min={5}
              max={35}
              value={length}
              className="cursor-pointer mr-1"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="mr-3 text-orange-400">Length : {length}</label>
            <input
              className="mr-1"
              type="checkbox"
              defaultChecked={numAllow}
              onChange={() => setNumAllow((prev) => !prev)}
            />
            <label className="mr-3 text-orange-400">Numbers</label>
            <input
              className="mr-1"
              type="checkbox"
              defaultChecked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label className="text-orange-400">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
