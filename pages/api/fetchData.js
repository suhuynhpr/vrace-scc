import fs from 'fs';

 // Thay đổi token của bạn ở đây

// const callApiAndWriteToFile = async (teams) => {
//   let memberData = {};

//   try {
//     for (const team of Object.keys(teams)) {
//       for (const user of teams[team] || []) {
//         const userId = user.id;
//         if (userId) {
//           const response = await fetch(
//             `https://apivrace.vnexpress.net/user/profile-overview?myvne_id=${userId}&token=${token}&is_app=1`,
//             {
//               headers: {
//                 'User-Agent': 'vRace/2.4.9 (iPhone; iOS 17.4; Scale/3.00)',
//                 Accept: '*/*',
//                 Host: 'apivrace.vnexpress.net',
//                 'Accept-Language': 'en-VN;q=1, vi-VN;q=0.9',
//                 Connection: 'keep-alive',
//               },
//             }
//           );
//           if (response.ok) {
//             const result = await response.json();
//             console.log('result :>> ', result);
//             const index = teams[team]?.findIndex((obj) => obj.id === userId);
//             if (index !== -1) {
//               teams[team][index].result =
//                 (result?.data?.run?.arr4w[3]?.total_km || 0) +
//                   (result?.data?.walk?.arr4w[3]?.total_km || 0) || 0;
//               memberData[team] = teams[team];
//             }
//           } else {
//             console.error(
//               `Lỗi khi gọi API cho người dùng ${userId}: ${response.status}`
//             );
//           }
//         }
//       }
//     }
//     console.log('memberData :>> ', memberData);
//   } catch (error) {
//     console.error('An error occurred while calling the API:', error);
//   }

//   // Ghi dữ liệu vào file
//   fs.writeFile(filePath, JSON.stringify(memberData, null, 2), 'utf8', (err) => {
//     if (err) {
//       console.error('An error occurred while writing to the file:', err);
//     } else {
//       console.log('API response has been written to file successfully.');
//     }
//   });
// };

// const handler = async (req, res) => {
//   if (req.method === 'POST') {
//     const teams = req.body.teams;
//     await callApiAndWriteToFile(teams);
//     res
//       .status(200)
//       .json({ message: 'API response has been written to file successfully.' });
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// };

// export default handler;


// const callApiSequentially = (teams) => {
//   let memberData = {};
//   let teamKeys = Object.keys(teams);
//   let currentTeamIndex = 0;
//   let currentUserIndex = 0;

//   const makeRequest = async () => {
//     if (currentTeamIndex < teamKeys.length) {
//       const team = teamKeys[currentTeamIndex];
//       const users = teams[team] || [];
//       if (currentUserIndex < users.length) {
//         const user = users[currentUserIndex];
//         const userId = user.id;
//         if (userId) {
//           try {
//             const response = await fetch(
//               `https://apivrace.vnexpress.net/user/profile-overview?myvne_id=${userId}&token=${token}&is_app=1`,
//               {
//                 headers: {
//                   'User-Agent': 'vRace/2.4.9 (iPhone; iOS 17.4; Scale/3.00)',
//                   Accept: '*/*',
//                   Host: 'apivrace.vnexpress.net',
//                   'Accept-Language': 'en-VN;q=1, vi-VN;q=0.9',
//                   Connection: 'keep-alive',
//                 },
//               }
//             );

//             if (response.ok) {
//               const result = await response.json();
//               console.log('result :>> ', result);
//               const index = teams[team]?.findIndex((obj) => obj.id === userId);
//               if (index !== -1) {
//                 teams[team][index].result =
//                   (result?.data?.run?.arr4w[3]?.total_km || 0) +
//                     (result?.data?.walk?.arr4w[3]?.total_km || 0) || 0;
//                 memberData[team] = teams[team];
//               }
//             } else {
//               console.error(
//                 `Lỗi khi gọi API cho người dùng ${userId}: ${response.status}`
//               );
//             }
//           } catch (error) {
//             console.error('An error occurred while calling the API:', error);
//           }
//         }
//         currentUserIndex++;
//       } else {
//         currentUserIndex = 0;
//         currentTeamIndex++;
//       }
//       setTimeout(makeRequest, 5000); // Gọi API tiếp theo sau 2 giây
//     } else {
//       console.log('memberData :>> ', memberData);
//       // Ghi dữ liệu vào file
//       fs.writeFile(
//         filePath,
//         JSON.stringify(memberData, null, 2),
//         'utf8',
//         (err) => {
//           if (err) {
//             console.error('An error occurred while writing to the file:', err);
//           } else {
//             console.log('API response has been written to file successfully.');
//           }
//         }
//       );
//     }
//   };

//   makeRequest();
// };

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const teams = req.body.teams;
    // callApiSequentially(teams);
    res.status(200).json({ message: 'API response processing started.' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;