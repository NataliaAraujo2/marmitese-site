//react
import React, { useRef } from "react";
import { useState, useEffect } from "react";
//css
import styles from "./Register.module.css";
// Components
import FormButton from "../../components/Button/FormButton";
import DangerButton from "../../components/Button/DangerButton";
//firebase
import { auth } from "../../firebase/config";
//hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useInsertDocument } from "../../hooks/useInsertDocument";
//context
import { useAuthValue } from "../../context/AuthContext";
//routes
import { useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Register = () => {
  //const to register
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //const to customerRegister
  const customerName = "";
  const customerEMail = "";
  const customerMobile = "";
  const customerDocument = "";
  const billingAddress = "";
  const billingNumber = "";
  const billingNeighborhood = "";
  const billingCity = "";
  const billingState = "";
  const billingZipCode = "";
  //useRef to Focus
  const displayNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { createUser, error: authError, loading } = useAuthentication(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      setPassword("");
      setConfirmPassword("");
      passwordRef.current.focus();
      return;
    }

    if (displayName === "") {
      setError("Preencha todos os campos");
      displayNameRef.current.focus();
      return;
    }

    if (email === "") {
      setError("Preencha todos os campos");
      emailRef.current.focus();
      return;
    }
    const res = await createUser(user);

    console.log(res);
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const { user } = useAuthValue();
  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("customerData");
  const uid = user.uid;

  const { documents: customersData } = useFetchDocuments(
    "customerData",
    null,
    uid
  );

  const addSubmitYes = (e) => {
    e.preventDefault();

    //looking for customer
    const found = customersData.find((element) => element === uid);
    if (found !== "undefined") {
      navigate("/");
      console.log(uid);
    } else {
      insertDocument({
        uid: user.uid,
        email: user.email,
        customerName,
        customerEMail,
        customerMobile,
        customerDocument,
        billingAddress,
        billingNumber,
        billingNeighborhood,
        billingCity,
        billingState,
        billingZipCode,
      });
      console.log("ação");
      navigate("/");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      {!user ? (
        <div>
          <h1>CRIE SUA CONTA</h1>
          <h3>Preencha os dados abaixo para se cadastrar no site!</h3>

          <div>
            <form onSubmit={handleSubmit}>
              <label className={styles.name}>
                <span>Nome:</span>
                <input
                  type="text"
                  name="displayName"
                  ref={displayNameRef}
                  placeholder="Nome de Usuário"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </label>
              <label>
                <span>Email:</span>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Digite seu Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <span>Senha:</span>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  required
                  placeholder="Insira sua Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </label>
              <label>
                <span>Confirmação de Senha:</span>
                <input
                  type="password"
                  name="confirmPassword"
                  ref={confirmPasswordRef}
                  required
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                />
              </label>

              {!loading && (
                <FormButton text="Cadastrar" onClick={handleSubmit} />
              )}
              {loading && <FormButton text="Aguarde..." disabled />}
              {error && <DangerButton text={error} />}
              {error === "E-mail já cadastrado" && (
                <div>
                  <ul>
                    <li>
                      <FormButton to="/login" Text="Clique aqui para entrar!" />
                    </li>
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <form className={styles.customerData} onSubmit={addSubmitYes}>
          <label>
            <span>Bem-Vindo(a)</span>
            <input
              type="text"
              name="displayName"
              defaultValue={user.displayName}
            />
          </label>
          <label>
            <input type="email" name="email" defaultValue={user.email} hidden />
            <span>Cadastro Efetuado com Sucesso!</span>
          </label>
          <div className={styles.btnCutomerData}>
            {!response.loading && (
              <FormButton text="OK" onClick={addSubmitYes} />
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
