import { useEffect, useState } from "react";

import { motion } from "motion/react";
import { useApi } from "../context/Contextprovider";
export default function View() {
    const [current,setcurrent] = useState(null)
  const {Api} = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${Api}/fetch`,{
            method:'post'
        });
        const data = await res.json();
        setItems(data.Items); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  if (loading) {
    return (
      <>
       
        <div className="flex min-h-screen items-center justify-center text-black bg-[var(--color-nav-bg)]">
          Loading...
        </div>
      </>
    );
  }

  return (
   
    <div>
        {current&&<Card current={current} />}
    <div onClick={()=>{if(current) setcurrent(null)}} className=" p-4 grid w-full grid-cols-1 sm:grid-cols-2 -z-1 lg:grid-cols-4 mt-20 gap-4">
  {items.length > 0 &&
    items.map((item, index) => (
      <motion.div layoutId={`{card-${item._id}`}
        key={index} onClick={()=>setcurrent({...item,Images:[item.CoverImage,...item.AdditionalImage]})}
        className="bg-[var(--color-card-bg)] z-10 cursor-pointer p-3 rounded-xl shadow-md border border-[var(--color-card-border)] flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.08 }}
        viewport={{ once: true }}
      >
        {item.CoverImage && (
          <img
            src={item.CoverImage}
            alt={item.Name}
            className="w-full h-50 object-cover rounded-md mb-2"
          />
        )}
        <h2 className="text-lg font-semibold text-[var(--color-card-text)] mb-0.5 uppercase">
          {item.Name}
        </h2>
        <p className="text-xs text-[var(--color-card-subtext)] mb-0.5 uppercase">{item.ItemType}</p>
        <p className="text-xs text-[var(--color-card-subtext)] line-clamp-3">{item.Description}</p>
      </motion.div>
    ))}
</div>
</div>

  );
}



const Card =({current})=>{
  const{Api} = useApi()
  const [currentImg, setCurrentImg] = useState(0);
    const [enquiry,senquiry] = useState('Enquire')
    const handleEnquiry= async ()=>{
         try {
    const response = await fetch(`${Api}/send-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ current }),
    });


    if (!response.ok) {
    senquiry('Error sending mail')
    }else{
        senquiry('Enquiry Sent')
    }

   
  } catch (error) {
   senquiry(error.message)
  }
    }
  return (
    <motion.div layoutId={`{card-${current._id}`} className="w-full max-w-md fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 mx-auto bg-white dark:bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl shadow-md overflow-hidden p-4 z-100">
    
      <div className="relative w-full h-48 mb-3 overflow-hidden rounded-md">
        {current.Images && current.Images.length > 0 ? (
          <>
            <img
              src={current.Images[currentImg]}
              alt={current.Name}
              className="w-full h-full object-cover transition-transform"
            />

            {current.Images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImg((prev)=>{
                        if(prev==0) return current.Images.length -1
                        else{
                            return (prev-1)
                        } 
                    }
                        
                    )
                  }
                  className="absolute left-2 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentImg((currentImg + 1) % current.Images.length)}
                  className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black"
                >
                  ›
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-[var(--color-card-subtext)]">
            No Images
          </div>
        )}
      </div>

    
      <h2 className="text-lg font-bold text-[var(--color-card-text)]">{current.Name}</h2>
      <p className="text-sm text-[var(--color-card-subtext)]">{current.ItemType}</p>
      <p className="text-xs mt-1 text-[var(--color-card-subtext)] line-clamp-2">{current.Description}</p>

    
      <button
        onClick={handleEnquiry}
        className="mt-3 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-md transition-colors"
      >
        {enquiry}
      </button>
    </motion.div>
  );
}


