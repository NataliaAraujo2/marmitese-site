import React, { useRef, useState } from "react";
import styles from "./CustomerRegister.module.css";
import { useAuthValue } from "../../context/AuthContext";
import FormButton from "../../components/Button/FormButton";
import DangerButton from "../../components/Button/DangerButton";
import { useFetchDocument } from "../../hooks/useFechDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const CustomerRegister = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerDocument, setCustomerDocument] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingNumber, setBillingNumber] = useState("");
  const [billingNeighborhood, setBillingNeighborhood] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const customerMobileRef = useRef();
  const customerDocumentRef = useRef();
  const billingZipCodeRef = useRef();
  //AuthData
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: customerData } = useFetchDocuments(
    "customerData",
    null,
    uid
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>MEU CADASTRO</h1>
      {customerData &&
        customerData.map((data) => (
          <form onSubmit={handleSubmit}>
            <h2>Dados Pessoais</h2>
            <label className={styles.name}>
              <span>Nome Completo:</span>
              <input
                type="text"
                name="customerName"
                placeholder="Digite seu nome completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </label>
            <label>
              <span>Telefone:</span>
              <input
                type="tel"
                name="customerMobile"
                ref={customerMobileRef}
                placeholder="Digite seu telefone"
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
              />
            </label>
            <label>
              <span>Documento:</span>
              <input
                type="text"
                name="customerDocument"
                ref={customerDocumentRef}
                required
                placeholder="Digite seu CPF ou CNPJ"
                value={customerDocument}
                onChange={(e) => setCustomerDocument(e.target.value)}
                autoComplete="off"
              />
            </label>
            <h2>Endereço</h2>
            <label>
              <span>CEP:</span>
              <input
                type="text"
                name="billingZipCode"
                ref={billingZipCodeRef}
                required
                placeholder="Digite seu CEP"
                value={billingZipCode}
                onChange={(e) => setBillingZipCode(e.target.value)}
                autoComplete="off"
              />
            </label>

            {/* {!loading && <FormButton text="Cadastrar" onClick={handleSubmit} />}
        {loading && <FormButton text="Aguarde..." disabled />}
  {error && <DangerButton text={error} />}*/}
          </form>
        ))}
    </div>
  );
};

export default CustomerRegister;
