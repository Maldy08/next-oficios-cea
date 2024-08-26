"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoDocumentAttachOutline,
  IoHomeOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoArrowUp,
  IoArrowDown,
  IoPencil,
} from "react-icons/io5";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-28 left-4 z-50 bg-[#383838] text-white p-3 rounded-full shadow-lg transition-transform transform hover:bg-[#383838]"
        >
          <IoMenuOutline className="w-6 h-6" />
        </button>
      )}

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 w-64 h-full bg-[#383838] text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-64 z-40`}
        aria-label="Sidebar"
      >
        <div className="relative h-full flex flex-col overflow-hidden">
          <div className="hidden lg:block">
            <Image
              src="/assets/logo-blanco.png"
              alt="logo"
              width={225}
              height={100}
              className="ml-3 mt-3"
            />
          </div>

          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg transition-transform transform hover:bg-red-600 lg:hidden z-50"
            >
              <IoCloseOutline className="w-6 h-6" />
            </button>
          )}

          <div className="flex-grow overflow-y-auto px-4 py-6">
            <ul className="space-y-4 font-medium">
              <li>
                <Link
                  href={"/oficios"}
                  className="flex items-center p-3 rounded-lg transition-transform duration-300 lg:hover:scale-105 lg:hover:bg-[#641c34]"
                >
                  <IoHomeOutline className="w-6 h-6" />
                  <span className="ml-4 text-lg">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/transparencia/documentos"}
                  className="flex items-center p-3 rounded-lg transition-transform duration-300 lg:hover:scale-105 lg:hover:bg-[#641c34]"
                >
                  <IoDocumentAttachOutline className="w-6 h-6" />
                  <span className="ml-4 text-lg">Documentos</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/oficios/oficios-recibidos"}
                  className="flex items-center p-3 rounded-lg transition-transform duration-300 lg:hover:scale-105 lg:hover:bg-[#641c34]"
                >
                  <IoArrowUp className="w-6 h-6" />
                  <span className="ml-4 text-lg">Oficios Recibidos</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/transparencia/"}
                  className="flex items-center p-3 rounded-lg transition-transform duration-300 lg:hover:scale-105 lg:hover:bg-[#641c34]"
                >
                  <IoArrowDown className="w-6 h-6" />
                  <span className="ml-4 text-lg">Oficios Expedidos</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/transparencia/"}
                  className="flex items-center p-3 rounded-lg transition-transform duration-300 lg:hover:scale-105 lg:hover:bg-[#641c34]"
                >
                  <IoPencil className="w-6 h-6" />
                  <span className="ml-4 text-lg">Oficios por Expedir</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
