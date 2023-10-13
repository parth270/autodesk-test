import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWidth from "../hooks/useWidth";
import Dropzone, { useDropzone } from "react-dropzone";
import axios from "axios";
import { setAny, setToken } from "../services/scroll";
import toast, { Toaster } from "react-hot-toast";
import ServiceClient from "../plugins/ServiceClient";
import Zip from "../plugins/ZipHelper";
import tools from "../plugins/Tools";
import JSZip from "jszip";
const bucket = {
  bucketKey: "a241faa",
  bucketOwner: "Uzxi1KCr05vZG28oSZAJTDa4uzUKJRUo",
  createdDate: 1695880208670,
  permissions: [
    {
      authId: "Uzxi1KCr05vZG28oSZAJTDa4uzUKJRUo",
      access: "full",
    },
  ],
  policyKey: "transient",
};
const Dropzone1 = ({ setVal }) => {
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState(null);
  const [text, setText] = useState("Drop your Image here!");

  const handleDrop = (e) => {
    if (e[0]) {
      console.log(e);
      setUrl(URL.createObjectURL(e[0]));
      setVal(e[0]);
    } else {
      setDropzoneActive(false);
      setText("Recieved input other than Image");
    }
  };

  const dispatch = useDispatch();

  const w = useWidth();

  useEffect(() => {
    if (w < 1000) {
      setText("Insert Image ");
    } else {
      setText("Drop your Image here!");
    }
  }, [w]);

  return (
    <>
      {url && (
        <div className="w-[100%] h-[300px] mt-[40px] flex mb-[0px] items-center justify-center">
          <img src={url} className="h-[100%] " alt="" />
        </div>
      )}
      <div
        className="w-[100%] h-[200px] bg-[#fff90] mt-[20px] backdrop-blur-[5px] flex items-center justify-center"
        style={{
          zIndex: 999999999999,
        }}
      >
        <Dropzone
          onDrop={handleDrop}
          onDragEnter={() => setDropzoneActive(true)}
          onDragLeave={() => setDropzoneActive(false)}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => (
            <div
              {...getRootProps()}
              className="cursor-pointer w-[100%] h-[200px] rounded-[5px] flex items-center justify-center duration-100 bg-[#ffffff60] backdrop-blur-[10px] good-fonted"
              style={{
                border: dropzoneActive ? "2px dashed #fff" : "2px dashed #ccc",
              }}
            >
              {/* move input element outside of the text container */}
              <input {...getInputProps()} />
              <p className="good-fonted text-[#000] good-fonted font-bold text-[16px] ">
                Drop Your File here!
              </p>
            </div>
          )}
        </Dropzone>
      </div>
    </>
  );
};

const TokenLoader = () => {
  const dotsArray = [".", "..", "..."];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dotsArray.length);
    }, 500); // Change the interval to 300 for 0.3s delay

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);
  return (
    <div className="w-[100%] h-[100vh] bg-white flex  items-center justify-center">
      <h1 className="font-medium text-[40px]">
        Authenticating {dotsArray[currentIndex]}
      </h1>
    </div>
  );
};

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
            fill={"#000"}
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const Main = ({ token }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.home);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  function urnToBase64(urn) {
    // Check if the input string starts with "urn:adsk.objects:os.object:"
    if (!urn.startsWith("urn:adsk.objects:os.object:")) {
      throw new Error("Invalid URN format");
    }

    // Create the base64 encoded URN string
    const base64Urn = btoa(urn);

    return base64Urn;
  }
  const [chcheck, setCheckec] = useState(false);
  const [urnTableData, setUrnTable] = useState(null);
  const [playThing, setPlayThing] = useState(null);
  const [chchekch, setChekchek] = useState(false);
  const zip = new JSZip();
  useEffect(() => {
    if (urnTableData !== null) {
      if (!chcheck) {
        const apapap = async () => {
          const serviceClient = new ServiceClient({ token: playThing.token });
          console.log(urnTableData.length);
          const falseArray = Array(urnTableData.length).fill(false);
          const alalala = async (item, i) => {
            const ress = await serviceClient.getDerivativesAsync(
              playThing.urn,
              item
            );
            console.log(
              ress.data,
              item
                .split("/")
                .slice(1)
                .map((e) => decodeURIComponent(e))
                .join("/"),
              i
            );
            if (ress.data) {
              zip.file(
                item
                  .split("/")
                  .slice(1)
                  .map((e) => decodeURIComponent(e))
                  .join("/"),
                ress.data
              );
            }
          };

          await Promise.all(urnTableData.map(alalala));

          const zipBlob = await zip.generateAsync({ type: "blob" });
          console.log(zipBlob);
          if (zipBlob) {
            const zipURL = URL.createObjectURL(zipBlob);

            const downloadLink = document.createElement("a");
            downloadLink.href = zipURL;

            // Set the download attribute to specify the default filename for the download
            downloadLink.download = "output.zip";

            // Add some text or label for the link
            downloadLink.innerText = "Download File";

            // Append the link to the document (e.g., to a specific container or the body)
            document.body.appendChild(downloadLink);

            // Simulate a click on the link to trigger the download
            downloadLink.click();

            document.body.removeChild(downloadLink);
            setLoading(false);
          }
        };

        apapap();
        setCheckec(true);
      } else {
      }
    }
  }, [urnTableData]);

  const [avkdsa, setkbbsvf] = useState(false);

  useEffect(() => {
    const checkjbka = async () => {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      console.log(zipBlob);
      if (zipBlob) {
        const zipURL = URL.createObjectURL(zipBlob);

        const downloadLink = document.createElement("a");
        downloadLink.href = zipURL;

        // Set the download attribute to specify the default filename for the download
        downloadLink.download = "output.zip";

        // Add some text or label for the link
        downloadLink.innerText = "Download File";

        // Append the link to the document (e.g., to a specific container or the body)
        document.body.appendChild(downloadLink);

        // Simulate a click on the link to trigger the download
        downloadLink.click();

        document.body.removeChild(downloadLink);
      }
    };
    if (chcheck) {
      if (!avkdsa) {
        checkjbka();
        setkbbsvf(true);
      }
    }
  }, [chchekch]);

  const getStatus = (urn, fallback) => {
    axios
      .get(
        `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((e) => {
        console.log(e);
        if (e.data.status !== "failed") {
          if (e.data.status === "success") {
            fallback(e);
          } else {
            setTimeout(() => {
              getStatus(urn, fallback);
            }, 1000);
          }
        } else {
          toast.error("Translation Job failed!");
        }
      })
      .catch((e) => {});
  };

  const downloadFile = (token, urn, fileName) => {
    axios
      .get(
        `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest/${`urn:adsk.viewing:fs.file:${urn}/output/0/${fileName}`}/signedcookies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        axios
          .get(response.data.url, {
            headers: {
              Cookie: "",
            },
          })
          .then((e) => {
            console.log(e);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
    // fetch(
    //   `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest/${`urn:adsk.viewing:fs.file:${urn}/output/0/${fileName}`}/signedcookies`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response;
    //   })
    //   .then((response) => response.headers.get("set-cookie"))
    //   .then((cookies) => {
    //     console.log(cookies);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  console.log(urnTableData);
  const processDownloadResult = (urn, promise, serviceClient, zip, re) => {
    console.log(urn, promise, serviceClient, zip, re);
    return promise
      .then(async (e) => {
        // console.log(e);
        // const downloadLink = document.createElement("a");
        // downloadLink.href = URL.createObjectURL(e.data);

        // // Set the download attribute to specify the default filename for the download
        // downloadLink.download = urn
        //   .split("/")
        //   .slice(1)
        //   .map((e) => decodeURIComponent(e))
        //   .join("/");

        // // Add some text or label for the link
        // downloadLink.innerText = "Download File";

        // // Append the link to the document (e.g., to a specific container or the body)
        // document.body.appendChild(downloadLink);

        // // Simulate a click on the link to trigger the download
        // downloadLink.click();

        // Remove the link from the document (optional)
        if (re) {
          const arr = await serviceClient.getSVFAssets(e.data, urn);
          console.log(arr);
          setUrnTable([urn, ...arr]);
          // setUrnTable(urn,)
        }

        // zip.addFile(
        //   urn
        //     .split("/")
        //     .slice(1)
        //     .map((e) => decodeURIComponent(e))
        //     .join("/"),
        //   e.data
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function generateZIP(accessToken, urn, guid, derivative) {
    // Import necessary libraries and tools for API requests and ZIP file creation.

    const serviceClient = new ServiceClient({ token: accessToken });

    try {
      // Obtain the manifest for the given URN.
      // const manifest = await serviceClient.getManifest(urn);

      // // Find the derivative with the specified GUID.
      // const derivative = manifest.derivatives.find(
      //   (derivative) => derivative.guid === guid
      // );

      // if (!derivative) {
      //   throw new Error("Derivative not found for the specified GUID.");
      // }

      // Initialize a ZIP file.
      const zip = new Zip();

      console.log(derivative);
      // setUrnTable([
      //   "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTI0MWZhYS90ZXN0Lm53ZA/output/0/0.svf",
      // ]);
      if (derivative) {
        await processDownloadResult(
          "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTI0MWZhYS90ZXN0Lm53ZA/output/0/0.svf",
          serviceClient.getDerivativesAsync(
            urn,
            "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTI0MWZhYS90ZXN0Lm53ZA/output/0/0.svf"
          ),
          serviceClient,
          zip,
          true
        );
      }
      // Download the derivative and add it to the ZIP file.
      // await processDerivative(serviceClient, urn, derivative, zip);

      // await serviceClient
      //   .getDerivativesAsync(
      //     urn,
      //     "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTI0MWZhYS90ZXN0Lm53ZA/output/0/0.svf"
      //   )
      //   .then(async (e) => {
      //     console.log(e);
      //     const res = await serviceClient.getSVFAssets(e.data, urn);
      //     res.forEach((e) => {
      //       console.log(e);
      //       setUrnTable([...urnTableData, e]);
      //     });
      //   })
      //   .catch((e) => {});

      // Generate the ZIP file as a downloadable file.
      // const zipBuffer = await zip.generate(); // Replace with the actual method for generating the ZIP file.

      // // Prepare the ZIP file for download.
      // const zipBlob = new Blob([zipBuffer], { type: "application/zip" });
      // const zipURL = URL.createObjectURL(zipBlob);
      return "";
    } catch (error) {
      console.error("Error generating ZIP:", error);
      throw error;
    }
  }

  async function processDerivative(serviceClient, urn, derivative, zip) {
    if (derivative.children && derivative.children.length > 0) {
      for (const child of derivative.children) {
        await processDerivative(serviceClient, urn, child, zip);
      }
    }

    // Download the derivative and add it to the ZIP file.
    const derivativeData = await serviceClient.getDerivativesAsync(
      urn,
      derivative.urn
    );
    zip.addFile(derivative.urn, derivativeData);
  }

  const UploadFile = (filee) => {
    setLoading(true);
    axios
      .get(
        "https://developer.api.autodesk.com/oss/v2/buckets/a241faa/objects/test.nwd/signeds3upload?minutesExpiration=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((e) => {
        console.log(e);
        toast.success("Obtained a Signed URL");
        const uploadKey = e.data.uploadKey;
        const signedUrl = e.data.urls[0];
        dispatch(setAny({ label: "uploadKey", value: uploadKey }));
        dispatch(setAny({ label: "signedUrl", value: signedUrl }));
        console.log(filee);
        axios
          .put(signedUrl, filee, {
            headers: {
              "Content-Type": "text/plain",
            },
          })
          .then((e) => {
            console.log(e);
            toast.success("File Uploaded Successfully!");
            axios
              .post(
                "https://developer.api.autodesk.com/oss/v2/buckets/a241faa/objects/test.nwd/signeds3upload",
                {
                  uploadKey: uploadKey,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((e) => {
                console.log(e);
                dispatch(setAny({ label: "finalized", value: e.data }));
                toast.success("Finalized the Upload Successfully!");
                const objectId = e.data.objectId;
                dispatch(setAny({ label: "objectId", value: objectId }));
                const encodedUrn = urnToBase64(objectId);
                dispatch(setAny({ label: "encodedUrn", value: encodedUrn }));
                axios
                  .post(
                    "https://developer.api.autodesk.com/modelderivative/v2/designdata/job",
                    {
                      input: {
                        urn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTI0MWZhYS90ZXN0Lm53ZA==",
                      },
                      output: {
                        destination: {
                          region: "us",
                        },
                        formats: [
                          {
                            type: "svf",
                            views: ["3d", "2d"],
                          },
                        ],
                      },
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        "x-ads-force": "true",
                      },
                    }
                  )
                  .then((e) => {
                    console.log(e);
                    const urnSource = e.data.urn;
                    dispatch(setAny({ label: "urnSource", value: urnSource }));
                    // setStep(1);
                    toast.success("Translation Job Started Successfully!");

                    getStatus(urnSource, (e) => {
                      const geomChild = e.data.derivatives[0].children[0];
                      console.log(geomChild);
                      // downloadFile(token, urnSource, "0.svf");
                      toast.success(
                        "Your File has been translated to SVF Successfully"
                      );

                      setPlayThing({
                        token: token,
                        urn: urnSource,
                        guid: geomChild.guid,
                        derivative: e.data.derivatives[0],
                      });

                      generateZIP(
                        token,
                        urnSource,
                        geomChild.guid,
                        e.data.derivatives[0]
                      );

                      // axios.get(`https://developer.api.autodesk.com/modelderivative/v2/designdata/${urnSource}/manifest/{{t6_obj_urn_0}}/signedcookies`)
                      // axios
                      //   .get(
                      //     `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urnSource}/metadata/${geomChild.guid}/properties`,
                      //     {
                      //       headers: { Authorization: `Bearer ${token}` },
                      //     }
                      //   )
                      //   .then((e) => {
                      //     console.log(e);
                      //   })
                      //   .catch((e) => {
                      //     console.log(e);
                      //   });
                    });
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(state);
  return (
    <>
      <div className="w-[100%] h-[100vh] relative">
        {step === 0 && (
          <div className="w-[100%] h-[100vh] flex-col flex items-center justify-center">
            <h1 className="font-bold text-[30px] absolute top-[100px]">
              1{":"} Upload Your Nwd file here
            </h1>
            <div className="w-[500px] relative h-[200px] ">
              {!loading ? (
                <Dropzone1
                  setVal={(e) => {
                    console.log(e);
                    setFile(e);
                    UploadFile(e);
                  }}
                />
              ) : (
                <Loader />
              )}
              {playThing && (
                <div
                  className="w-[100%] h-[40px] bg-black mt-[10px] flex items-center justify-center  text-white font-medium text-[13px]"
                  onClick={async () => {
                    generateZIP(
                      playThing.token,
                      playThing.urn,
                      playThing.guid,
                      playThing.derivatives
                    );
                  }}
                >
                  Generate Zip
                </div>
              )}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="w-[100%] h-[100vh] flex-col flex items-center justify-center">
            <h1 className="font-bold text-[30px] absolute top-[100px]">
              2{":"}Methods to do
            </h1>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

const Home = () => {
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();

  const Token = useSelector((state) => state.home.AccessToken);

  const getToken = () => {
    const client_id = localStorage.getItem("client-id");
    const client_secret = localStorage.getItem("client-secret");
    axios
      .post(
        "https://developer.api.autodesk.com/authentication/v1/authenticate",
        {
          client_id: client_id,
          client_secret: client_secret,
          grant_type: "client_credentials",
          scope:
            "code:all data:write data:read bucket:create bucket:delete bucket:read",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "PF=lgdrkRjNOu3NZN1l1UAzBf",
          },
        }
      )
      .then((e) => {
        console.log(e);
        const token = e.data.access_token;
        dispatch(setToken(token));
        localStorage.setItem("access-token", token);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!check) {
      getToken();
      setCheck(true);
    }
  });

  return <>{Token ? <Main token={Token} /> : <TokenLoader />}</>;
};

export default Home;
