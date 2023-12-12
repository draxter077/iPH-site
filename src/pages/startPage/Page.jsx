import { Background, Button, Alert } from "./style.js"

import { HelpScreen } from "./parts/help/Section.jsx"
import { Topo } from "./parts/topo/Section.jsx"
import { AcessContainer } from "./parts/acessContainer/Section.jsx"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

import TransitionScreen from "../transitionScreen/Page.jsx"

import { API, homeURL } from "../../variablesValues.js"

import { names } from "./helpFunction/strings.js"

export default function StartPage(){
    const navigate = useNavigate()
    const [openSignUp, setOpenSignUp] = useState(false);
    const [transitionChange, setTransitionChange] = useState(false)
    const [showHelp, setShowHelp] = useState(false)
    const [wrongName, setWrongName] = useState(false)
    const [wrongEmail, setWrongEmail] = useState(false)
    const [wrongPass, setWrongPass] = useState(false)
    const [wrongConfPass, setWrongConfPass] = useState(false)
    const [loadingAnimation, setLoadingAnimation] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const [buttonDis, setButtonDis] = useState(false)

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function changeWindow(){
        setTransitionChange(true); 
        await sleep(1000);
        navigate(homeURL);
    }

    function isEmail(email){
        let before = email;
        let after = email.replaceAll("@")
        if(before == after){
            return false
        }
        else{
            return true
        }
    }

    async function inputError(functionsArray, text){
        setButtonDis(true)
        for(let i = 0; i < functionsArray.length; i++){
            functionsArray[i](true)
        }
        setAlertText(text)
        setShowAlert(true)
        await sleep(1000)
        for(let i = 0; i < functionsArray.length; i++){
            functionsArray[i](false)
        }
        setLoadingAnimation(false)
        await sleep(4000)
        setShowAlert(false)
        setButtonDis(false) 
    }

    async function logIn(e){
        let userEmail = e.target.parentElement.children[0].children[1].value
        let userPassword = e.target.parentElement.children[0].children[2].value
        if(userEmail.length == 0 || userPassword.length == 0){
            await inputError([setWrongEmail, setWrongPass], "Ops, você esqueceu de completar todos os campos :)")
        }
        else if(!(isEmail(userEmail))){
            await inputError([setWrongEmail], "Ops, preencha o email corretamente :)")
        }
        else{
            setLoadingAnimation(true);
            setButtonDis(true)
            let logObj = {email: userEmail, password: userPassword};
            await axios.post(API + "/login", logObj)
                .then(resposta => {localStorage.setItem("investerUser", JSON.stringify(resposta.data)); changeWindow()})
                .catch(async response => {
                    if (response.code == "ERR_NETWORK"){
                        await inputError([], "Ops, não consegui me conectar ao servidor :(")
                    }
                    else if(response.response.status == 402){
                        await inputError([setWrongEmail], "Ops, não consegui encontrar seu email :(")
                    }
                    else if(response.response.status == 401){
                        await inputError([setWrongPass], "Ops, a senha está errada :(")
                    }
                })
        }
        
    }

    async function signUp(e){
        let userName = e.target.parentElement.children[0].children[0].value
        let userEmail = e.target.parentElement.children[0].children[1].value
        let userPassword = e.target.parentElement.children[0].children[2].value
        let userConfPassword = e.target.parentElement.children[0].children[3].value
        if(userName.length == 0 || userEmail.length == 0 || userPassword.length == 0 || userConfPassword.length == 0){
            await inputError([setWrongName, setWrongEmail, setWrongPass, setWrongConfPass], "Ops, você esqueceu de completar todos os campos :)")
        }
        else if(!(isEmail(userEmail))){
            await inputError([setWrongEmail], "Ops, preencha o email corretamente :)")
        }
        else if(userPassword != userConfPassword){
            await inputError([setWrongConfPass], "Ops, as senhas devem ser iguais :)")
        }
        else{
            setLoadingAnimation(true);
            setButtonDis(true)
            let logObj = {name: names(userName), email: userEmail, password: userPassword};
            await axios.post(API + "/signup", logObj)
                .then(resposta => {localStorage.setItem("investerUser", JSON.stringify(resposta.data)); changeWindow()})
                .catch(async response => {
                    if (response.code == "ERR_NETWORK"){
                        await inputError([], "Ops, não consegui me conectar ao servidor :(")
                    }
                    else if(response.response.status == 409){
                        await inputError([setWrongEmail], "Ops, esse email já está vinculado a uma conta :(")
                    }
                })
        }
    }

    return(
        <>
        <TransitionScreen $display={transitionChange}/>
        <HelpScreen $display={showHelp} setFunc={setShowHelp}/>
        
        <Background>

            <Topo setShowHelp={setShowHelp}/>

            <AcessContainer loadingAnimation={loadingAnimation} openSignUp={openSignUp} wrongName={wrongName} wrongEmail={wrongEmail} wrongPass={wrongPass} wrongConfPass={wrongConfPass} buttonDis={buttonDis} signUp={signUp} logIn={logIn} />

            <Button onClick={() => setOpenSignUp(!openSignUp)}>{openSignUp ? "Entrar em uma conta" : "Criar uma conta"}</Button>
        </Background>

        <Alert $showUp={showAlert}>
            {alertText}
        </Alert>
        </>
    )
}