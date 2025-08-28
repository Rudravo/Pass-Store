import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Body = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async() =>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
            setpasswordArray(passwords)
    }
    useEffect(() => {
        getPasswords()
    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("/src/icons/eyecross.png")) {
            ref.current.src = "src/icons/eye (1).png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/src/icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }


    const savePassword = async () => {
    if (form.id) {
    await fetch(`http://localhost:3000/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
    });

    setpasswordArray([...passwordArray, form]);
    }
    else {
        
        const newPassword = { ...form, id: uuidv4() };

        await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassword)
        });

        setpasswordArray([...passwordArray, newPassword]);
    }

    setform({ site: "", username: "", password: "" });
    };


    const editPassword = (id) => {
    const selected = passwordArray.find(i => i.id === id);
    setform(selected);
    setpasswordArray(passwordArray.filter(item => item.id !== id));
    };



    const deletePassword = async(id) => {
        let c = confirm("Do you really wanna delete?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
             await fetch(`http://localhost:3000/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        }
    }

    
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div className='absolute h-full w-full bg-violet-400/35'>
            <div className='p-4 text-center'>
                <h1 className='text-4xl text font-bold'>
                    <span>&lt;Pass</span><span className='text-amber-600'>/Store&gt;</span>
                </h1>
                <p>Manage your Passwords at ease</p>
            </div>
            <div className='flex flex-col gap-4 items-center '>
                <input value={form.site} onChange={handleChange} name='site' id='site' placeholder='Enter Website-URL' className='rounded-full border border-violet-500 w-1/2 p-4 py-1'></input>
                <div className='flex flex-row justify-center w-1/2'>
                    <input value={form.username} onChange={handleChange} name='username' id='username' placeholder='Enter Username' className='rounded-full border border-violet-500 p-4  py-1'></input>
                </div>
                <div className='relative'>
                    <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' id='password' type='password' placeholder='Enter Password' className='rounded-full border border-violet-500 p-4 py-1'></input>
                    <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                        <img ref={ref} className='p-1' width={26} src='/src/icons/eye (1).png' alt='eye' />
                    </span>
                </div>
                <button onClick={savePassword} className='flex justify-center items-center w-fit rounded-full px-8 py-2 border-1 border-violet-900 bg-violet-600 hover:bg-violet-700 '>
                    Save</button>
            </div>
            <div className="passwords flex justify-center items-center py-10">
                <h1 className='p-6 font-extrabold'>Your Passwords</h1>
                {passwordArray.length === 0 && <div>No Password to Show</div>}
                {passwordArray.length != 0 && <table className="table-auto border-collapse border border-gray-600 w-3/4">
                    <thead className='bg-violet-700 text-white'>
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>

                        </tr>
                    </thead>
                    <tbody className='bg-violet-300'>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className='text-center py-2 border border-gray-300 '><span>{item.site}</span></td>
                                <td className='text-center py-2 border border-gray-300 '><span>{item.username}</span></td>
                                <td className='text-center py-2 border border-gray-300 '><span>{item.password}</span></td>
                                <td className='flex flex-row gap-4 justify-center items-center text-center py-2 border border-gray-300 '><span>
                                    <img className='w-5' src='/src/icons/edit1.png' onClick={() => { editPassword(item.id) }} /></span>
                                    <span><img className='w-5' src='/src/icons/delete.png' onClick={() => { deletePassword(item.id) }} /></span>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default Body

