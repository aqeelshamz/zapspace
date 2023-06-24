"use client";
import { businessCategories, serverURL } from "@/utils/util";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronDown, FiSettings, FiHome, FiBook, FiPieChart, FiUsers, FiShoppingBag } from "react-icons/fi";

export default function Dashboard({
    children,
}: {
    children: React.ReactNode
}) {
    const [businessData, setBusinessData] = useState<any>({ name: "" });

    const getBusiness = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/business`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config).then((response) => {
            setBusinessData(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getBusiness();
    }, []);

    return <div className="flex w-screen h-screen bg-white">
        <div style={{ background: businessData?.category !== -1 ? businessCategories[businessData.category]?.color : "#DDC12D" }} className="min-w-[300px] h-screen text-black p-[20px] flex flex-col">
            <div onClick={() => { window.location.href = "/" }} className="flex relative cursor-pointer items-center bg-[black] rounded-lg p-[10px] mb-[15px]">
                {/* <div className="flex absolute bg-[#EEEFF3] rounded-lg cursor-pointer p-4 bottom-[-50px] right-0">
                        <FiLogOut className="text-[red] text-2xl" />
                        <p className="text-[red] font-medium ml-2">Logout</p>
                    </div> */}
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 flex items-center justify-center bg-white" style={{ display: "flex" }}>
                        <p>{businessData?.name.toString().toUpperCase()[0]}</p>
                    </div>
                </div>
                <div className="w-full flex justify-between items-center pr-2">
                    <p className="pl-2 font-semibold text-white">{businessData?.name}</p>
                    <FiChevronDown className="text-white" />
                </div>
            </div>
            <div className="flex flex-col h-full bg-white rounded-lg p-[10px] mb-[10px]">
                <Link href={"/dashboard"}><button className="flex justify-start btn bg-white hover:bg-slate-100 mb-2 w-full"><FiHome /> Dashboard</button></Link>
                <Link href={"/dashboard/products"}><button className="flex justify-start btn bg-white hover:bg-slate-100 mb-2 w-full"><FiShoppingBag /> Products</button></Link>
                <Link href={"/dashboard/blog"}><button className="flex justify-start btn bg-white hover:bg-slate-100 mb-2 w-full"><FiBook /> Blog</button></Link>
                <Link href={"/dashboard/analytics"}><button className="flex justify-start btn bg-white hover:bg-slate-100 mb-2 w-full"><FiPieChart /> Analytics</button></Link>
                <Link href={"/dashboard/social"}><button className="flex justify-start btn bg-white hover:bg-slate-100 mb-2 w-full"><FiUsers /> Social</button></Link>
                <Link href={"/dashboard/settings"}><button className="flex justify-start btn bg-white hover:bg-slate-100 mb-2 w-full"><FiSettings /> Settings</button></Link>
            </div>
        </div>
        <main className="p-4 w-full">
            {children}
            {businessData.name ? <div className="flex w-full justify-between absolute bottom-0 left-0">
                <Image src={businessData?.category !== -1 ? businessCategories[businessData.category]?.image : "https://cdn3d.iconscout.com/3d/premium/thumb/shopping-store-5130510-4292743.png"} alt="icon" width={250} height={250} />
            </div> : ""}
        </main>
    </div>;
}