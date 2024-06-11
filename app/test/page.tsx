import React from 'react'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <table className={'w-full table-fixed'}>
        <thead>
          <tr>
            <th className={' w-[50%]'}>1</th>
            <th className={'flex flex-row'}>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis deleniti enim inventore ipsam porro repudiandae
                similique. Blanditiis delectus dolorum enim quas vero? Et
                explicabo inventore ipsa iste odio omnis, quasi?
              </div>
            </th>
            <th>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              deleniti enim inventore ipsam porro repudiandae similique.
              Blanditiis delectus dolorum enim quas vero? Et explicabo inventore
              ipsa iste odio omnis, quasi?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={'overflow-hidden'}>
              <div className={'w-[1000px]'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis deleniti enim inventore ipsam porro repudiandae
                similique. Blanditiis delectus dolorum enim quas vero? Et
                explicabo inventore ipsa iste odio omnis, quasi? Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Corporis deleniti
                enim inventore ipsam porro repudiandae similique. Blanditiis
                delectus dolorum enim quas vero? Et explicabo inventore ipsa
                iste odio omnis, quasi? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Corporis deleniti enim inventore ipsam porro
                repudiandae similique. Blanditiis delectus dolorum enim quas
                vero? Et explicabo inventore ipsa iste odio omnis, quasi? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Corporis
                deleniti enim inventore ipsam porro repudiandae similique.
                Blanditiis delectus dolorum enim quas vero? Et explicabo
                inventore ipsa iste odio omnis, quasi?
              </div>
            </td>
            <td>111</td>
            <td>111</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
