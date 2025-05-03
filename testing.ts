import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI( {apiKey:process.env.GEMINI_API_KEY} );

async function main(){
    const result = await ai.models.generateContent({
        model:"gemini-1.5-flash",
        contents:[{
            role:"user",
            parts:[{
                text:"what is 2+2"
            }]
        }]
    })
    
    console.log(result.text)
}

main()

