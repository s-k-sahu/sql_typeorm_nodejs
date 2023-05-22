import { Link, useNavigate, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../generated/graphql";
import { FormWrapper } from "./style";
import { Wrapper } from "../../components/wrapper";
import { isAuthenticated, saveToken } from "../../helper/auth";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [submitLogin, { error, loading }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

//   if (isAuthenticated())return navigate("/");
  
  const onSubmitHander = async (data: FormData) => {
    try {
      const resp = await submitLogin({
        variables: data,
      });
      saveToken(resp.data?.login.access_token!);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper center={true}>
      <FormWrapper className="login-container">
        <div className="left-side">
          <img
            src="https://businesstemplates.co.nz/wp-content/uploads/2020/12/login-concept-illustration_114360-739.jpg"
            alt="login"
          />
        </div>
        <div className="right-side">
          <div>
            <img
              src="https://www.freeiconspng.com/uploads/evernote-icon-2.png"
              alt=""
            />
            <h2>Nevernote</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmitHander)}>
            <div>
              <input
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be atleast 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-error">{errors.password.message}</p>
              )}
            </div>

            {error &&
              error.graphQLErrors.map(({ message }, i) => (
                <div key={i}>
                  <small className="error-message">{message}</small>
                </div>
              ))}

            <div>
              <button disabled={isSubmitting || loading} type="submit">
                {loading ? "..." : "Submit"}
              </button>
            </div>

            <p>
              Don't have an account? Signup&nbsp;
              <span>
                <Link to="/signup">here</Link>
              </span>
            </p>
          </form>
        </div>
      </FormWrapper>
    </Wrapper>
  );
}
