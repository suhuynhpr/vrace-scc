import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { TableProps } from "antd";
import { Flex, Select, Table, Tag, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import teams from "../data/api_response.json";
import teams_03_06 from "../data/api_response_03_06.json";
import teams_20_05 from "../data/api_response_20_05.json";
import teams_27_05 from "../data/api_response_27_05.json";
import teams_10_06 from "../data/api_response_10_06.json";
import teams_17_06 from "../data/api_response_17_06.json";
import teams_24_06 from "../data/api_response_24_06.json";
import teams_08_07 from "../data/api_response_08_07.json";
import teams_15_07 from "../data/api_response_15_07.json";
const { Text, Link } = Typography;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  // borderRadius: 6,
  // border: '1px solid #40a9ff',
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    onCell: (_, index) => {
      if (index === 0) {
        return { rowSpan: 8 };
      } else {
        return { rowSpan: 0 };
      }
      // if ([1, 2, 3, 4].includes(index)) {
      //   return { rowSpan: 0 };
      // }
    },
    render: (_, record: any) => (
      <span style={{ color: "blue", fontWeight: "bold" }}>{record.team}</span>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render(value, record, index) {
      return <p style={{ whiteSpace: "nowrap" }}>{value}</p>;
    },
  },
  {
    title: "Point",
    key: "result",
    dataIndex: "result",
    render: (text, data) => (
      <Tag color={+text > 3 ? "green" : "volcano"} key={data.name}>
        {text?.toFixed(2)}
      </Tag>
    ),
  },
];

export default function Home() {
  const [init, setInit] = useState(false);
  const [data, setData] = useState<any>(teams);
  const sortedData = Object.entries(teams).sort((a: any, b: any) => {
    const teamASum = a[1]?.reduce(
      (sum: any, player: any) => sum + Number(player?.result ?? 0),
      0
    );
    const teamBSum = b[1]?.reduce(
      (sum: any, player: any) => sum + Number(player?.result ?? 0),
      0
    );

    return teamBSum - teamASum; // Sort descending
  });

  // Convert back to the original object format
  const sortedObject = Object.fromEntries(sortedData);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: any = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: "#000000",
        },
        image: "",
        position: "",
        repeat: "",
        size: "",
        opacity: 1,
      },
      backgroundMask: {
        composite: "destination-out",
        cover: {
          color: {
            value: "#fff",
          },
          opacity: 1,
        },
        enable: false,
      },
      clear: true,
      defaultThemes: {},
      delay: 0,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      detectRetina: true,
      duration: 0,
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: false,
            mode: [],
          },
          onDiv: {
            selectors: [],
            enable: false,
            mode: [],
            type: "circle",
          },
          onHover: {
            enable: false,
            mode: [],
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 1,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            mix: false,
            divs: {
              distance: 200,
              duration: 0.4,
              mix: false,
              selectors: [],
            },
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5,
            },
            radius: 60,
          },
          grab: {
            distance: 100,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          push: {
            default: true,
            groups: [],
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 20,
            easing: "ease-out-quad",
            divs: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 20,
              easing: "ease-out-quad",
              selectors: [],
            },
          },
          slow: {
            factor: 3,
            radius: 200,
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: "#ffffff",
                },
                stop: {
                  value: "#000000",
                },
              },
              radius: 1000,
            },
            shadow: {
              color: {
                value: "#000000",
              },
              length: 2000,
            },
          },
        },
      },
      manualParticles: [],
      particles: {
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        collisions: {
          absorb: {
            speed: 1,
          },
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          enable: false,
          maxSpeed: 20,
          mode: "bounce",
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        color: {
          value: "#fff",
          animation: {
            h: {
              count: 0,
              enable: false,
              speed: 10,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            s: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            l: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
          },
        },
        effect: {
          close: true,
          fill: true,
          options: {},
          type: [],
        },
        groups: {
          z5000: {
            number: {
              value: 70,
            },
            zIndex: {
              value: 50,
            },
          },
          z7500: {
            number: {
              value: 30,
            },
            zIndex: {
              value: 75,
            },
          },
          z2500: {
            number: {
              value: 50,
            },
            zIndex: {
              value: 25,
            },
          },
          z1000: {
            number: {
              value: 40,
            },
            zIndex: {
              value: 10,
            },
          },
        },
        move: {
          angle: {
            offset: 0,
            value: 10,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0,
          },
          decay: 0,
          distance: {},
          direction: "right",
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: false,
            inverse: false,
            maxSpeed: 20,
          },
          path: {
            clamp: true,
            delay: {
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          random: false,
          size: false,
          speed: 2,
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {},
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: false,
            width: 1920,
            height: 1080,
          },
          limit: {
            mode: "delete",
            value: 0,
          },
          value: 200,
        },
        opacity: {
          value: 1,
          animation: {
            count: 0,
            enable: false,
            speed: 2,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: "#000",
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: "circle",
        },
        size: {
          value: 3,
          animation: {
            count: 0,
            enable: false,
            speed: 2,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 5,
          opacityRate: 0.5,
          sizeRate: 1,
          velocityRate: 1,
        },
        destroy: {
          bounds: {},
          mode: "none",
          split: {
            count: 1,
            factor: {
              value: 3,
            },
            rate: {
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
            particles: {},
          },
        },
        roll: {
          darken: {
            enable: false,
            value: 0,
          },
          enable: false,
          enlighten: {
            enable: false,
            value: 0,
          },
          mode: "vertical",
          speed: 10,
        },
        tilt: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          enable: false,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
        wobble: {
          distance: 5,
          enable: false,
          speed: {
            angle: 50,
            move: 10,
          },
        },
        life: {
          count: 0,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 0,
            sync: false,
          },
        },
        rotate: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          path: false,
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45,
          },
          width: 1,
        },
        links: {
          blink: false,
          color: {
            value: "#fff",
          },
          consent: false,
          distance: 100,
          enable: false,
          frequency: 1,
          opacity: 1,
          shadow: {
            blur: 5,
            color: {
              value: "#000",
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        repulse: {
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      themes: [],
      zLayers: 100,
      name: "Among Us",
      emitters: {
        autoPlay: true,
        fill: true,
        life: {
          wait: false,
        },
        rate: {
          quantity: 1,
          delay: 7,
        },
        shape: {
          options: {},
          replace: {
            color: false,
            opacity: false,
          },
          type: "square",
        },
        startCount: 0,
        size: {
          mode: "percent",
          height: 0,
          width: 0,
        },
        particles: {
          shape: {
            type: "images",
            options: {
              images: {
                src: "https://particles.js.org/images/cyan_amongus.png",
                width: 500,
                height: 634,
              },
            },
          },
          size: {
            value: 40,
          },
          move: {
            speed: 2,
            outModes: {
              default: "none",
              right: "destroy",
            },
            straight: true,
          },
          zIndex: {
            value: 0,
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 10,
              sync: true,
            },
          },
        },
        position: {
          x: -5,
          y: 55,
        },
      },
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
    }),
    []
  );

  const particlesLoaded: any = (container: any) => {
    console.log(container);
  };
  return (
    <>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <Select
        style={{ marginTop: 5, marginLeft: 20, width: 200 }}
        onChange={(e) => {
          switch (e) {
            case "teams_20_05":
              setData(teams_20_05);
              break;
            case "teams_27_05":
              setData(teams_27_05);
              break;
            case "teams_03_06":
              setData(teams_03_06);
              break;

            case "teams_10_06":
              setData(teams_10_06);
              break;
            case "teams_17_06":
              setData(teams_17_06);
              break;
            case "teams_24_06":
              setData(teams_24_06);
              break;

            case "teams_08_07":
              setData(teams_08_07);
              break;

            case "teams_15_07":
              setData(teams_15_07);
              break;

            default:
              setData(teams);
              break;
          }
        }}
        defaultValue="teams"
        options={[
          { label: "20/5 - 26/5", value: "teams_20_05" },
          {
            label: "27/5 - 2/6",
            value: "teams_27_05",
          },
          {
            label: "3/6 - 9/6",
            value: "teams_03_06",
          },
          {
            label: "10/6 - 16/6",
            value: "teams_10_06",
          },
          {
            label: "17/6 - 23/6",
            value: "teams_17_06",
          },
          {
            label: "24/6 - 30/6",
            value: "teams_24_06",
          },
          {
            label: "08/7 - 14/7",
            value: "teams_08_07",
          },
          {
            label: "15/7 - 21/7",
            value: "teams_15_07",
          },
          {
            label: "22/7 - 28/7",
            value: "teams",
          },
        ]}
      />
      <Flex gap="middle" align="start" vertical wrap style={{ margin: "20px" }}>
        <Flex
          style={boxStyle}
          justify="flex-start"
          align="stretch"
          wrap
          gap="small"
        >
          {/* <Table columns={columns} dataSource={data} pagination={false} />
        <Table columns={columns} dataSource={data} pagination={false} />
        <Table columns={columns} dataSource={data} pagination={false} /> */}

          {/* {Object.keys(memberData).map((team) => {
          console.log(team, memberData[team]);
          return (
            <Table
              columns={columns}
              dataSource={memberData[team]}
              pagination={false}
              size='small'
            />
          ); */}

          {Object.keys(sortedObject).map((team, index) => {
            return (
              <Table
                key={index}
                columns={columns}
                dataSource={data[team]}
                pagination={false}
                size="small"
                style={{ width: "380px" }}
                footer={(list) => {
                  const isConditionMet = list.reduce((sum, item: any) => {
                    if (
                      (item["result"] < 3 && item["name"]) ||
                      (item["name"] && typeof item["result"] !== "number")
                    ) {
                      return sum + 1;
                    } else {
                      return sum;
                    }
                  }, 0);

                  const total = list.reduce((sum, item: any) => {
                    if (
                      item["id"].length > 9 &&
                      item["result"] !== undefined &&
                      typeof item["result"] === "number"
                    ) {
                      return sum + item["result"];
                    } else {
                      return sum + 0;
                    }
                  }, 0);

                  const numberUser = list.reduce((sum, item) => {
                    if (item["name"]) {
                      return sum + 1;
                    } else {
                      return sum;
                    }
                  }, 0);
                  const totalIsConditionMet = isConditionMet * 3;
                  const average = (total - totalIsConditionMet) / numberUser;
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "magenta", fontWeight: "400" }}>
                        AVERAGE
                      </span>
                      <Tag
                        color={average > 3 ? "lime" : "orange"}
                        style={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        {average.toFixed(0)}
                      </Tag>
                    </div>
                  );
                }}
              />
            );
          })}
        </Flex>
      </Flex>
    </>
  );
}
