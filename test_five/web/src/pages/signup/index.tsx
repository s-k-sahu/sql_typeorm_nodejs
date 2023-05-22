import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "../../components/wrapper";
import { FormWrapper } from "./style";
import { useSignupMutation } from "../../generated/graphql";

type FormData = {
  email: string;
  password: string;
};

export default function Signup() {
  const [submitSignup, { error, loading }] = useSignupMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmitHander = async (data: FormData) => {
    try {
      await submitSignup({
        variables: data,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper center={true}>
      <FormWrapper className="login-container">
        <div className="left-side">
          <img
            src="https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
              {error &&
                error.graphQLErrors.map(({ message }, i) => (
                  <div key={i}>
                    <small className="error-message">{message}</small>
                  </div>
                ))}
            </div>
            <div>
            <div>
              <button disabled={isSubmitting || loading} type="submit">
                {loading ? "..." : "Submit"}
              </button>
            </div>
            </div>
            <p>
              Already have an account? Login&nbsp;
              <span>
                <Link to="/login">here</Link>
              </span>
            </p>
          </form>
        </div>
      </FormWrapper>
    </Wrapper>
  );
}
