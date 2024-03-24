// export async function POST() {
//     const res = await fetch('https://dsa-backend-1ca76fb6bbb8.herokuapp.com/blob storage/upload_csv/', {
//       method: 'POST',
//       body: JSON.stringify({ time: new Date().toISOString() }),
//     });
//     const data = await res.json();
//     return Response.json(data);
//   }
export async function GET() {
    const res = await fetch('https://dsa-backend-1ca76fb6bbb8.herokuapp.com/blob storage/get_csv/?file_name=Sale%20Report.csv', {
    });
    const data = await res.json();
    return Response.json({ data });
}
