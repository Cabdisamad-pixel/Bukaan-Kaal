import React from 'react'






const ProductPackage = ({ backroundColor, gridArea,image }) => {

  // const background = image  true && ima
  return (
    <div style={{ backgroundImage : `url(${image})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', gridArea: gridArea, borderRadius: '5px' }}>
      {/* <img src="image" alt="" /> */}
    </div>
  );
};

export default ProductPackage