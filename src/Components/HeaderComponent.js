import React from 'react';

import SimpleMenu from "../UIComponents/DropdownComponent";

const HeaderComponent = ({namePage, username}) => {
    return(
        <div className={'firstLine'}>
            <div>
                {namePage}
            </div>
            <div className={"firstLine_user"}>{username}<SimpleMenu  src = {"https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"}/></div>
        </div>
    );
};


export default HeaderComponent;