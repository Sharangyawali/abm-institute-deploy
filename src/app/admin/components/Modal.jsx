"use client"
import React,{useState} from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
    <div className="fixed inset-0 bg-[#b3b3b3] opacity-60"></div>
    <div className="relative w-[100%] tablet:w-[500px] laptop:w-[600px]  mx-auto bg-white rounded-lg shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 mt-3 mr-3 text-gray-600 bg-transparent rounded-full hover:text-black focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {children}
    </div>
  </div>
  )
}

export default Modal
