import React from 'react'
interface Props {}

export default function Page({}: Props) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="overflow-auto h-full">
        <table className="w-full h-full">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-[1000px]">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr className="h-[1000px]">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr className="h-[1000px]">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
