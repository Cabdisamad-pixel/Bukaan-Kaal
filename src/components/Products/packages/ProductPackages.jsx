import React from 'react'
import ProductPackage from './ProductPackage'
// import { Container } from 'postcss'
import ContainerUI from '../../../UI/Container/ContainerUI'
import image1 from '../../../images/image1.png'
import image2 from '../../../images/image2.png'
import image3 from '../../../images/image3.png'
import image4 from '../../../images/image4.png'
import image5 from '../../../images/image5.png'



const ProductPackages = () => {
    return (


        <>
            <ContainerUI>
                <ProductPackage backroundColor="yellow" gridArea={'yellow'} image={image1}/>
                <ProductPackage backroundColor="green" gridArea={'green'} image={image2}/>
                <ProductPackage backroundColor="gray" gridArea={'gray'} image={image3}/>
                <ProductPackage backroundColor="blue" gridArea={'blue'} image={image4}/>
                <ProductPackage backroundColor="skyblue" gridArea={'skyblue'} image={image5}/>
            </ContainerUI>
        </>
    )
}

export default ProductPackages