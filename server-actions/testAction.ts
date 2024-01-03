export default async function testAction({ time }: { time: number }) {
  console.log('time', time)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`after ${time},hello world`)
    }, time)
  })
}
