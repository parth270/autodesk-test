import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const imges = [
  "https://molotovbackenduploads.s3.amazonaws.com/public/kisspng-businessperson-management-lean-in-women-work-an-chopped-5b2b8af3cb6429.8697232515295802758331.png",
  "https://cdn.pixabay.com/photo/2021/06/04/11/24/woman-6309565_960_720.jpg",
  "https://images.ctfassets.net/1wryd5vd9xez/4DxzhQY7WFsbtTkoYntq23/a4a04701649e92a929010a6a860b66bf/https___cdn-images-1.medium.com_max_2000_1_Y6l_FDhxOI1AhjL56dHh8g.jpeg",
  "https://faceoffdb.com/wp-content/uploads/2022/04/shana-.jpg",
];

const Loader = () => {
  return (
    <svg
      aria-hidden="true"
      class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      style={{
        width: "20px",
        height: "20px",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#000"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="#fff"
      />
    </svg>
  );
};

const Loader1 = () => {
  return (
    <svg
      aria-hidden="true"
      class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#fff"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="#000"
      />
    </svg>
  );
};

const Talk = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [vid, setVid] = useState(null);
  const [list, setList] = useState([]);
  const [phase, setPhase] = useState(0);
  const getData = (id, append) => {
    axios
      .get(`https://api.d-id.com/clips/${id}`, {
        headers: {
          Authorization: `Basic ZnVzZUBtb2xvdG92Y29ja3RhaWwudHY:JeSDP8aM1yDqV8b8e9PVe`,
        },
      })
      .then((e) => {
        console.log(e);
        if (e.data.status !== "done") {
          setTimeout(() => {
            getData(id, append);
          }, 1000);
        } else {
          if (append.length > 1) {
          } else {
            setPhase(null);
          }
          setVid(e.data.result_url);
          setList([...list, ...append]);
          setLoading(false);
        }
        // if (e.data.talks.length > 0) {
        //   const lastElement = e.data.talks[e.data.talks.length - 1];
        //   console.log(lastElement, lastElement.result_url);
        //   setVid(lastElement.result_url);
        // }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const submit = (test, append) => {
    // {
    //   source_url: imges[0],
    //   script: {
    //     type: "text",
    //     input: test,
    //     subtitles: "false",
    //     provider: { type: "microsoft", voice_id: "en-US-JennyNeural" },
    //     ssml: "false",
    //   },
    //   config: { fluent: "false", pad_audio: "0.0" },
    // },
    axios
      .post(
        "https://api.d-id.com/clips",
        {
          driver_id: "uM00QMwJ9x",
          script: {
            type: "text",
            subtitles: "false",
            input: test,
            provider: { type: "microsoft", voice_id: "en-US-JennyNeural" },
            ssml: "false",
          },
          config: { result_format: "webm" },
          presenter_config: {
            crop: {
              type: "rectangle",
              rectangle: {
                bottom: 0,
                top: 0,
                left: 0,
                right: 0,
              },
            },
          },
          presenter_id: "amy-jcwCkr1grs",
        },
        {
          headers: {
            Authorization: `Basic ZnVzZUBtb2xvdG92Y29ja3RhaWwudHY:JeSDP8aM1yDqV8b8e9PVe`,
          },
        }
      )
      .then((e) => {
        console.log(e);
        getData(e.data.id, append);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function generateResponse(prompt, check) {
    setLoading(true);
    const response = await axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      )
      .then((e) => {
        console.log(e);
        const result = e.data.choices[0].message;
        console.log(list);
        if (!check) {
          const append = [
            {
              content: prompt,
              role: "user",
            },
            {
              content: result.content,
              role: result.role,
            },
          ];
          submit(result.content, append);
        } else {
          const append = [
            {
              content: result.content,
              role: result.role,
            },
          ];
          submit(result.content, append);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const vidref = useRef();
  const containerRef = useRef();

  const scrollToBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [list]);

  return (
    <>
      {phase === 0 && (
        <div className="w-[100%] h-[100vh] absolute text-[40px] font-bold flex-col bg-[#fff] z-20 flex items-center justify-center">
          <div
            onClick={() => {
              generateResponse(
                "ask me this question: Hello! how are you doing? if you could have any superpower in the world, what would it be?  ",
                true
              );
              setPhase(1);
            }}
            className="flex cursor-pointer hover:underline"
          >
            {" "}
            Hello There, Shall we have a talk?
            <img
              src="/talk.svg"
              className="w-[80px] translate-y-[-11px]"
              alt=""
            />
          </div>
        </div>
      )}
      {phase === 1 && (
        <div className="w-[100%] h-[100vh] absolute text-[40px] font-bold flex-col bg-[#fff] z-20 flex items-center justify-center">
          <Loader1 />
        </div>
      )}
      <div className="w-[100%] flex items-center justify-center z-0 h-[100vh] relative">
        <div className="w-[70%] h-[100vh] border-x-[3px] border-[#000] flex flex-col ">
          <div className="w-[100%] items-center h-[280px] border-b-[3px] shrink-0  border-[#000] shrink-0 flex justify-center">
            <div className="w-[250px] h-[250px] overflow-hidden rounded-[50%] border-[2px] border-dashed border-[#000]">
              {vid ? (
                <video
                  src={vid}
                  ref={vidref}
                  onClick={(e) => {
                    vidref.current.currentTime = 0;
                    vidref.current.play();
                  }}
                  className="w-[100%] h-[100%] cursor-pointer"
                  type="video/mp4"
                  autoPlay
                />
              ) : (
                <img src={imges[0]} className="w-[100%] h-[100%]" alt="" />
              )}
            </div>
          </div>
          <div
            ref={containerRef}
            className="w-[100%] h-[100%] py-[10px] scroll-bar-cool1 overflow-y-auto"
          >
            {list.map((item, i) => {
              return (
                <div
                  style={{
                    justifyContent: item.role === "user" ? "end" : "start",
                  }}
                  className="w-[100%] py-[3px] mb-[4px] min-h-[33px] flex  px-[10px]"
                >
                  <div
                    style={{
                      backgroundColor: item.role === "user" ? "#ccc" : "#000",
                      color: item.role === "user" ? "#000" : "#fff",
                    }}
                    className=" text-[#fff]  py-[8px] text-[14px] font-medium rounded-sm px-[10px] "
                  >
                    <div>{item.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[100%] border-y-[3px] shrink-0 flex  border-[#000] h-[60px]">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setList([
                    ...list,
                    {
                      role: "user",
                      content: input,
                    },
                  ]);
                  generateResponse(input);
                  setInput("");
                  // submit();
                }
              }}
              placeholder="type your message here!"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              className="w-[100%] h-[100%] outline-none px-[20px] text-[20px] font-medium "
            />
            <div
              onClick={() => {
                setList([
                  ...list,
                  {
                    role: "user",
                    content: input,
                  },
                ]);
                generateResponse(input);
                setInput("");
                //   submit();
                // getData();
              }}
              className="w-[150px]   text-[#fff] shrink-0 text-[15px] font-medium cursor-pointer border-[3px] bg-[#000] border-[#000] h-[57px] flex items-center justify-center"
            >
              {loading ? <Loader /> : "Send"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Talk;

// {
//   "driver_id": "uM00QMwJ9x",
//   "script": {
//       "type": "text",
//       "subtitles": "false",
//       "input": `  A Letter from the Chair & CEO
//       Adena Friedman Chair & CEO, Nasdaq

//       At Nasdaq, our position at the intersection of capital markets and technology allows us to approach environmental, social, and governance issues from a unique vantage point. It also provides us with an important role to support our clients’ success across the global economy, acting as a bridge between key market constituents — from asset owners to corporates — as they navigate the complexity of an evolving ESG landscape.
//       Nasdaq’s own corporate sustainability strategy is designed to solidify our business resilience. We are committed to advancing meaningful sustainability efforts to reverse the negative effects of climate change by minimizing our environmental footprint and delivering market-based innovations that support a net-zero future. We are also committed to deepening our culture of diversity, equity, and inclusion as we solidify our position as a destination for the world’s leading talent, as well as continuing to lead with best practice governance policies.
//       Our efforts are producing tangible results. In 2022, we achieved carbon neutrality for the fifth year in a row, and our net-zero emissions targets were approved by the Science Based Targets initiative. We were also recognized by several third-party validators for our sustainability efforts and inclusive workplace policies. We expanded our community impact around the globe through the Nasdaq Foundation, establishing thoughtful partnerships aimed at diversifying entrepreneurship and creating accessible pathways to the wealth capital markets can create. Each of these efforts reflects our renewed corporate purpose: to advance economic progress for all.

//       The new organizational structure we implemented at the end of 2022 further strengthens our ability to create even greater impact. Our new divisional structure aligns our business more closely with the foundational shifts that will shape the global financial system over the decade ahead, including the modernization of markets, the development of a complex ESG ecosystem facing corporates and investors, and the increasing need within the financial system for advanced anti-financial crime technology.
//       We are investing in market infrastructure innovations to ensure that capital markets are resilient and can continue to power opportunity around the world. We are empowering our clients to navigate the capital markets and their own sustainability journeys more effectively. Additionally, we are driving the global fight against financial crime with a comprehensive suite of solutions designed to help us get ahead — and stay ahead — of those who seek to abuse the financial system for their own gain. The pages that follow tell a more complete story about our achievements in 2022. But I am most inspired about what comes next. The most successful sustainability initiatives are those that can be upheld for the long-term, and the groundwork we laid in recent years will help us do just that.
//       I am confident that we will continue to build on our momentum in 2023 and beyond — letting our past achievements fuel future successes and delivering even greater impact for our clients and for communities around the world. Adena Friedman, Chair & CEO, Nasdaq

//     `,
//       "provider": {
//           "type": "microsoft",
//           "voice_id": "en-US-JennyNeural"
//       },
//       "ssml": "false"
//   },
//   "config": {
//       "result_format": "webm"
//   },
//   "presenter_config": {
//       "crop": {
//           "type": "rectangle",
//           "rectangle": {
//               "bottom": 0,
//               "top": 0,
//               "left": 0,
//               "right": 0
//           }
//       }
//   },
//   "presenter_id": "amy-jcwCkr1grs"
// }

const arrrr = {
  driver_id: "uM00QMwJ9x",
  script: {
    type: "text",
    subtitles: "false",
    input: `  Una carta del presidente

    En Nasdaq, nuestra posición en la intersección de los mercados de capitales y la tecnología nos permite abordar cuestiones ambientales, sociales y de gobernanza desde un punto de vista único. También nos proporciona un papel importante para respaldar el éxito de nuestros clientes en toda la economía global, actuando como un puente entre los componentes clave del mercado (desde propietarios de activos hasta corporaciones) mientras navegan por la complejidad de un panorama ESG en evolución.
    La propia estrategia de sostenibilidad corporativa de Nasdaq está diseñada para solidificar nuestra resiliencia empresarial. Estamos comprometidos a promover esfuerzos significativos de sostenibilidad para revertir los efectos negativos del cambio climático minimizando nuestra huella ambiental y ofreciendo innovaciones basadas en el mercado que respalden un futuro neto cero. También estamos comprometidos a profundizar nuestra cultura de diversidad, equidad e inclusión a medida que solidificamos nuestra posición como destino para el talento líder del mundo, además de continuar liderando con políticas de gobernanza de mejores prácticas.
    Nuestros esfuerzos están produciendo resultados tangibles. En 2022, logramos la neutralidad de carbono por quinto año consecutivo y nuestros objetivos de emisiones netas cero fueron aprobados por la iniciativa Science Based Targets. También fuimos reconocidos por varios validadores externos por nuestros esfuerzos de sostenibilidad y políticas laborales inclusivas. Ampliamos nuestro impacto comunitario en todo el mundo a través de la Fundación Nasdaq, estableciendo asociaciones reflexivas destinadas a diversificar el espíritu empresarial y crear caminos accesibles hacia la riqueza que los mercados de capital pueden crear. Cada uno de estos esfuerzos refleja nuestro renovado propósito corporativo: promover el progreso económico para todos.
  
    La nueva estructura organizativa que implementamos a finales de 2022 fortalece aún más nuestra capacidad para crear un impacto aún mayor. Nuestra nueva estructura divisional alinea nuestro negocio más estrechamente con los cambios fundamentales que darán forma al sistema financiero global durante la próxima década, incluida la modernización de los mercados, el desarrollo de un complejo ecosistema ESG al que se enfrentan las empresas y los inversores, y la creciente necesidad dentro del sector financiero. sistema de tecnología avanzada contra la delincuencia financiera.
    Estamos invirtiendo en innovaciones de infraestructura de mercado para garantizar que los mercados de capitales sean resilientes y puedan seguir generando oportunidades en todo el mundo. Estamos capacitando a nuestros clientes para que naveguen por los mercados de capitales y sus propios viajes de sostenibilidad de manera más efectiva. Además, estamos impulsando la lucha global contra los delitos financieros con un conjunto integral de soluciones diseñadas para ayudarnos a adelantarnos (y mantenernos a la vanguardia) de quienes buscan abusar del sistema financiero para su propio beneficio. Las páginas que siguen cuentan una historia más completa sobre nuestros logros en 2022. Pero lo que más me inspira es lo que viene después. Las iniciativas de sostenibilidad más exitosas son aquellas que pueden mantenerse a largo plazo, y el trabajo preliminar que sentamos en los últimos años nos ayudará a lograr precisamente eso.
    Confío en que continuaremos aprovechando nuestro impulso en 2023 y más allá, permitiendo que nuestros logros pasados impulsen éxitos futuros y generando un impacto aún mayor para nuestros clientes y comunidades de todo el mundo. Adena Friedman, presidenta
  
    `,
    provider: {
      type: "microsoft",
      voice_id: "en-US-JennyNeural",
    },
    ssml: "false",
  },
  config: {
    result_format: "webm",
  },
  presenter_config: {
    crop: {
      type: "rectangle",
      rectangle: {
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      },
    },
  },
  presenter_id: "amy-jcwCkr1grs",
};




const arrrr1 = {
  driver_id: "uM00QMwJ9x",
  script: {
    type: "text",
    subtitles: "false",
    input: `   Uma carta do presidente
    Cadeira Adena Friedman
  
  
    Na Nasdaq, a nossa posição na intersecção dos mercados de capitais e da tecnologia permite-nos abordar questões ambientais, sociais e de governação a partir de um ponto de vista único. Também nos proporciona um papel importante para apoiar o sucesso dos nossos clientes em toda a economia global, agindo como uma ponte entre os principais constituintes do mercado — desde proprietários de ativos a empresas — à medida que navegam na complexidade de um cenário ESG em evolução.
    A própria estratégia de sustentabilidade corporativa da Nasdaq foi projetada para solidificar a resiliência do nosso negócio. Estamos empenhados em promover esforços significativos de sustentabilidade para reverter os efeitos negativos das alterações climáticas, minimizando a nossa pegada ambiental e fornecendo inovações baseadas no mercado que apoiam um futuro com emissões líquidas zero. Também estamos empenhados em aprofundar a nossa cultura de diversidade, equidade e inclusão à medida que solidificamos a nossa posição como destino para os principais talentos do mundo, bem como continuamos a liderar com políticas de governação de melhores práticas.
    Nossos esforços estão produzindo resultados tangíveis. Em 2022, atingimos a neutralidade carbónica pelo quinto ano consecutivo e as nossas metas de emissões líquidas zero foram aprovadas pela iniciativa Science Based Targets. Também fomos reconhecidos por vários validadores terceiros pelos nossos esforços de sustentabilidade e políticas de local de trabalho inclusivas. Expandimos o nosso impacto comunitário em todo o mundo através da Fundação Nasdaq, estabelecendo parcerias ponderadas destinadas a diversificar o empreendedorismo e a criar caminhos acessíveis para a riqueza que os mercados de capitais podem criar. Cada um destes esforços reflecte o nosso propósito corporativo renovado: promover o progresso económico para todos.
  
    A nova estrutura organizacional que implementamos no final de 2022 fortalece ainda mais a nossa capacidade de criar um impacto ainda maior. A nossa nova estrutura divisional alinha o nosso negócio mais estreitamente com as mudanças fundamentais que moldarão o sistema financeiro global ao longo da próxima década, incluindo a modernização dos mercados, o desenvolvimento de um ecossistema ESG complexo que as empresas e os investidores enfrentam, e a crescente necessidade dentro do sector financeiro. sistema para tecnologia avançada de combate ao crime financeiro.
    Estamos a investir em inovações em infraestruturas de mercado para garantir que os mercados de capitais sejam resilientes e possam continuar a gerar oportunidades em todo o mundo. Estamos capacitando nossos clientes a navegar nos mercados de capitais e em suas próprias jornadas de sustentabilidade de forma mais eficaz. Além disso, estamos a impulsionar a luta global contra o crime financeiro com um conjunto abrangente de soluções concebidas para nos ajudar a ultrapassar — e permanecer à frente — daqueles que procuram abusar do sistema financeiro para seu próprio ganho. As páginas a seguir contam uma história mais completa sobre nossas conquistas em 2022. Mas estou mais inspirado com o que vem a seguir. As iniciativas de sustentabilidade mais bem-sucedidas são aquelas que podem ser mantidas a longo prazo, e o trabalho de base que estabelecemos nos últimos anos ajudar-nos-á a fazer exatamente isso.
    Estou confiante de que continuaremos a aproveitar o nosso impulso em 2023 e mais além – deixando que as nossas conquistas passadas alimentem sucessos futuros e proporcionando um impacto ainda maior para os nossos clientes e para as comunidades em todo o mundo. Adena Friedman, presidente
  
    `,
    provider: {
      type: "microsoft",
      voice_id: "en-US-JennyNeural",
    },
    ssml: "false",
  },
  config: {
    result_format: "webm",
  },
  presenter_config: {
    crop: {
      type: "rectangle",
      rectangle: {
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      },
    },
  },
  presenter_id: "amy-jcwCkr1grs",
};
