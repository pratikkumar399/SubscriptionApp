import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

import InputControl from "../Input/Input";

import styles from "./Signup.module.css";
import { useUserAuth } from "../../context/UserAuthContext";

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const { signup } = useUserAuth();
    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signup(values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                });
                navigate("/");
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Signup</h1>

                <InputControl
                    label="Name"
                    placeholder="Enter your name"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, name: event.target.value }))
                    }
                />
                <InputControl
                    label="Email"
                    placeholder="Enter email address"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                />
                <InputControl
                    label="Password"
                    placeholder="Enter password"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, pass: event.target.value }))
                    }
                />

                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button className={styles.center} onClick={handleSubmission} disabled={submitButtonDisabled}>
                        Create Account
                    </button>
                    <p>
                        Already have an account?{" "}
                        <span>
                            <Link to="/">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;