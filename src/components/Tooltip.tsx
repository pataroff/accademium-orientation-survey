import React, { ReactNode, useState } from 'react';

const Tooltip: React.FC<{ text: string; children: ReactNode }> = ({
  text,
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className='absolute top-0 w-full'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className='absolute -top-[5.5rem] border ml-2 w-[24rem] rounded-xl bg-white p-6 z-10'>
          <h3 className='font-coolvetica font-normal text-xs'>{text}</h3>
        </div>
      )}
    </div>
  );
};
export default Tooltip;
