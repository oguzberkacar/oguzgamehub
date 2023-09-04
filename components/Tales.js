"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import parse from "html-react-parser";

export default function Tales({c_name}) {
  const router = useRouter();

 

  //   useEffect(() => {
  //     // Perform localStorage action
  //     let email =
  //       localStorage.getItem("email") || sessionStorage.getItem("email");
  //     if (!email) {
  //       router.push("/login");
  //     }
  //   }, []);

  //   const [city, setCity] = useState("Antalya");



  const [name, setName] = useState(c_name);
  const [petType, setPetType] = useState("cat");
  const [petName, setPetName] = useState("");
  const [tale, setTale] = useState("");

  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);

  const [gender, setGender] = useState("girl");
  const [imageSrc, setImageSrc] = useState("");

  function formatTextWithPTags(text) {
    const paragraphs = text.split("NEWP-");
    const formattedParagraphs = paragraphs
      .filter((paragraph) => paragraph.trim() !== "")
      .map((paragraph) => `<p>${paragraph.trim().replace(/\n/g, "<br>")}</p>`)
      .join("");

    return formattedParagraphs;
  }

  useEffect(() => {
    console.log("pt", petType);
  }, [petType]);

  function handlePrompt() {
    setLoader(true);
    console.log("pt2", petType);
    setImageSrc(`/img/tales/${gender}_${petType}.png`);
    console.log(`/${gender}_${petType}.png`);

    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "appliati/json");
    myHeaders.append("Content-Type", "application/json");

    let prompt = `Write me fairy tale for children under 12 years old, not exceeding 200 words, suitable for children under 12 years old. Main Character: ${name} Main Character's Pet: ${petType} and name is ${petName} Topic: ${tale}`;

    // var raw = { prompt: prompt };
    var raw = JSON.stringify({ prompt: prompt });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/tales", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);
        setLoader(false);
        // replace NEWP- with new line
        // data = data.replaceAll("NEWP-", "\n");
        data = formatTextWithPTags(data);
        console.log(data);
        setAnswer(data);
        let promptElement = document.getElementById("prompt");
        promptElement.classList.remove("hidden");
        promptElement.classList.add("flex");
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <main
      className={`flex bg-[url('/img/flowerbg.jpg')] bg-fixed bg-center bg-no-repeat bg-cover min-h-screen flex-col items-center justify-center p-4 py-16 p-md-24 ${inter.className}  `}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-md-6xl text-5xl font-bold text-center">
          <span className="text-blue-500">Smart</span>Tales
        </h1>
        <p>Hello, {c_name}</p>
        <p className=" text-md text-center font-semibold mt-4 tracking-[0.375rem]">
          Unleash Your
        </p>
        <p className="text-md  flex items-center justify-center uppercase bgwhiteopacity px-4 py-1 rounded-lg text-center font-bold  text-blue-500 tracking-[0.375rem]">
          Imagination
        </p>
      </div>
      <div id="prompt" className="hidden items-center justify-start">
        {/* copy text btn */}
        <div className="flex flex-col justify-center bgwhiteopacity whitespace-break-spaces px-4 py-8 rounded-lg items-center relative w-full my-24 max-w-2xl">
          <Image
            src={imageSrc}
            className="mt-8 mb-16 rounded-md"
            alt="tale_photo"
            width={300}
            height={200}
          />
          {parse(answer)}
        </div>
      </div>

      {loader ? (
        <div className="flex rounded-lg max-w-md px-4 py-2 pt-4  bgwhiteopacity flex-col items-center justify-center w-full mt-16">
          <div className="flex-1 space-y-6 py-1 w-full animate-pulse">
            <div className="space-y-5">
              <div className="grid grid-cols-12 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-10"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="grid grid-cols-12 gap-4 ">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-10"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
          <p className="text-center mt-4 mb-2 font-semibold tracking-[0.3rem]">
            Creating your tale..
          </p>
        </div>
      ) : (
        <div
          className={`my-12 w-full w-md-96 max-w-md ${
            answer.length > 0 ? "hidden" : ""
          }	`}
        >
          {/* <div className="flex justify-center items-center ">
            <div className="mb-2 block w-full">
              <Label color="gray" htmlFor="name" value="Your Name" />
              <TextInput
                id="name"
                sizing="md"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div> */}

          <div className="flex justify-center items-center ">
            <div className="mb-2 block w-full">
              <Label color="gray" htmlFor="base" value="Pet type" />
              <Select
                onChange={(e) => {
                  setPetType(e.target.value);
                }}
                id="pet"
                required
              >
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
              </Select>
            </div>

            <div className="mb-2 ml-2 block w-full">
              <Label color="gray" htmlFor="base" value="Pet Name" />

              <TextInput
                id="base"
                sizing="md"
                type="text"
                onChange={(e) => {
                  setPetName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex justify-center items-center ">
            <div className="mb-2 block w-full">
              <Label color="gray" htmlFor="name" value="Your idea to tale" />
              <TextInput
                id="name"
                sizing="md"
                type="text"
                onChange={(e) => {
                  setTale(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button onClick={handlePrompt} className="px-8" color="light">
              Send
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
