import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Loader = () => {
  return (
    <div className="w-[100%] h-[100%] bg-[#00000010] border-[2px] border-black border-dashed flex items-center justify-center top-0 left-0">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#cccccc00"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill={"#fff"}
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
const Login = ({ children }) => {
  const [check, setCheck] = useState(null);
  const [check1, setCheck1] = useState(false);
  useEffect(() => {
    if (!check1) {
      const client_id = localStorage.getItem("client-id");
      const client_secret = localStorage.getItem("client-secret");
      if (check === null) {
        if (client_id) {
          setCheck(true);
        } else {
          setCheck(false);
        }
      }
      setCheck1(true);
    }
  });

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      {check === null ? (
        <></>
      ) : (
        <>
          {check ? (
            children
          ) : (
            <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center">
              <div className=" flex flex-col items-center">
                <h1 className="text-center text-[40px] font-bold">
                  AutoDesk Model Deriative
                </h1>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-[500px] px-[10px] rounded-[3px] mt-[10px] h-[50px] border-black border-[2px] font-medium text-[15px] "
                  placeholder="Username"
                />
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  className="w-[500px] px-[10px] rounded-[3px] mt-[10px] h-[50px] border-black border-[2px] font-medium text-[15px] "
                  placeholder="Password"
                />
                <div
                  onClick={() => {
                    if (user !== "" && pass !== "") {
                      setLoading(true);
                      axios
                        .post(
                          "https://developer.api.autodesk.com/authentication/v1/authenticate",
                          {
                            client_id: user,
                            client_secret: pass,
                            grant_type: "client_credentials",
                            scope:
                              "code:all data:write data:read bucket:create bucket:delete bucket:read",
                          },
                          {
                            headers: {
                              "Content-Type":
                                "application/x-www-form-urlencoded",
                              Cookie: "PF=lgdrkRjNOu3NZN1l1UAzBf",
                            },
                          }
                        )
                        .then((e) => {
                          localStorage.setItem("client-id", user);
                          localStorage.setItem("client-secret", pass);
                          toast.success("Login Successfully!");
                          setCheck(true);
                          setLoading(false);
                        })
                        .catch((e) => {
                          setLoading(false);
                          toast.error("Wrong Creds!");
                          console.log(e);
                        });
                    }
                  }}
                  className="w-[500px] h-[50px] flex items-center justify-center text-white text-[15px] font-mmedium bg-black mt-[10px] cursor-pointer hover:opacity-80"
                >
                  {loading ? <Loader /> : "Submit"}
                </div>
                <Toaster position="top-center" reverseOrder={false} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Login;
