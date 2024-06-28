import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
// import prismaMiddleware from '@/helper/middlewarePrisma';

export async function middleware(request,next) {    
const authToken=request.cookies.get('authToken')?.value
const role=request.cookies.get('role')?.value
// login and register as not needed if authToken and role in cookies
if(authToken&&role){
  if(request.nextUrl.pathname==='/login'|| request.nextUrl.pathname==='/register'){
    try {
      const {payload} = await jwtVerify(authToken, getJwtSecretKey());
      // const user=await prismaMiddleware.user.findUnique({
      //   where:{
      //     id:payload.id
      //   }
      // })
      if(payload.role==='Admin'){
        return NextResponse.redirect(new URL("/admin/dashboard",request.url))
      }
      else if(payload.role==='FrontDesk'){
        return NextResponse.redirect(new URL("/front-desk/dashboard",request.url))
      }
      else if(payload.role==='Teacher'){
        return NextResponse.redirect(new URL("/teacher/attendance",request.url))
      }
      else if(payload.role==='Accounting'){
        return NextResponse.redirect(new URL("/accountant/dashboard",request.url))
      }
    } catch (error) {
      console.log(error)
      console.log("error in token verification")
    }
  }
}
// Admin apis  protected routes
const protectedRoute1=request.nextUrl.pathname.startsWith('/api/admin/')||request.nextUrl.pathname.startsWith('/admin/')
const protectedRoute2=request.nextUrl.pathname.startsWith('/api/front-desk/')||request.nextUrl.pathname.startsWith('/front-desk/')
const protectedRoute3=request.nextUrl.pathname.startsWith('/api/accountant/')||request.nextUrl.pathname.startsWith('/accountant/')
const protectedRoute4=request.nextUrl.pathname.startsWith('/api/teacher/')||request.nextUrl.pathname.startsWith('/teacher/')
if(protectedRoute1){
  try {
          if(!authToken){
            return NextResponse.redirect(new URL("/login",request.url))
          }
          const {payload} = await jwtVerify(authToken, getJwtSecretKey());
          if(request.nextUrl.pathname.startsWith('/admin/')){
            // const user=await prisma.user.findUnique({
            //   where:{
            //     id:payload.id
            //   }
            // }) 
            // console.log("here")
            // console.log(user)
          }
            // if(!user){
            //   const response=NextResponse.redirect(new URL("/login",request.url))
            //   response.cookies.set("authToken","",{
            //     httpOnly:true,
            //     secure:true,
            //     sameSite:'strict',
            //     expires:new Date(0)
            //   })
            //   response.cookies.set("role","",{
            //     httpOnly:true,
            //     secure:true,
            //     sameSite:'strict',
            //     expires:new Date(0)
            //   })
            //   return response
            // }
           if(payload.role!=='Admin'){
            return NextResponse.redirect(new URL("/login",request.url))
           }
        } catch (error) {
            return NextResponse.redirect(new URL("/login",request.url))
        }
  }

  if(protectedRoute2){
    try {
            if(!authToken){
              return NextResponse.redirect(new URL("/login",request.url))
            }
              const {payload} = await jwtVerify(authToken, getJwtSecretKey());
        
              if(request.nextUrl.pathname.startsWith('/front-desk/')){
                // const user=await prisma.user.findUnique({
                //   where:{
                //     id:payload.id
                //   }
                // }) 
                // if(!user){
                //   const response=NextResponse.redirect(new URL("/login",request.url))
                //   response.cookies.set("authToken","",{
                //     httpOnly:true,
                //     secure:true,
                //     sameSite:'strict',
                //     expires:new Date(0)
                //   })
                //   response.cookies.set("role","",{
                //     httpOnly:true,
                //     secure:true,
                //     sameSite:'strict',
                //     expires:new Date(0)
                //   })
                //   return response
                // }
                if(payload.role!=='FrontDesk'){
                 return NextResponse.redirect(new URL("/login",request.url))
                }
              }
             if(payload.role!=='FrontDesk'&&payload.role!=='Admin'){
              return NextResponse.redirect(new URL("/login",request.url))
             }
          } catch (error) {
              return NextResponse.redirect(new URL("/login",request.url))
          }
    }
    
    if(protectedRoute3){
      try {
              if(!authToken){
                return NextResponse.redirect(new URL("/login",request.url))
              }
                const {payload} = await jwtVerify(authToken, getJwtSecretKey());
          
                if(request.nextUrl.pathname.startsWith('/accountant/')){
                  // const user=await prisma.user.findUnique({
                  //   where:{
                  //     id:payload.id
                  //   }
                  // }) 
                  // if(!user){
                  //   const response=NextResponse.redirect(new URL("/login",request.url))
                  //   response.cookies.set("authToken","",{
                  //     httpOnly:true,
                  //     secure:true,
                  //     sameSite:'strict',
                  //     expires:new Date(0)
                  //   })
                  //   response.cookies.set("role","",{
                  //     httpOnly:true,
                  //     secure:true,
                  //     sameSite:'strict',
                  //     expires:new Date(0)
                  //   })
                  //   return response
                  // }
                  if(payload.role!=='Accounting'){
                   return NextResponse.redirect(new URL("/login",request.url))
                  }
                }
               if(payload.role!=='Accounting'&&payload.role!=='Admin'){
                return NextResponse.redirect(new URL("/login",request.url))
               }
            } catch (error) {
                return NextResponse.redirect(new URL("/login",request.url))
            }
      }
      
      if(protectedRoute4){
        try {
                if(!authToken){
                  return NextResponse.redirect(new URL("/login",request.url))
                }
                  const {payload} = await jwtVerify(authToken, getJwtSecretKey());
            
                  if(request.nextUrl.pathname.startsWith('/teacher/')){
                    // const user=await prisma.user.findUnique({
                    //   where:{
                    //     id:payload.id
                    //   }
                    // }) 
                    // if(!user){
                    //   const response=NextResponse.redirect(new URL("/login",request.url))
                    //   response.cookies.set("authToken","",{
                    //     httpOnly:true,
                    //     secure:true,
                    //     sameSite:'strict',
                    //     expires:new Date(0)
                    //   })
                    //   response.cookies.set("role","",{
                    //     httpOnly:true,
                    //     secure:true,
                    //     sameSite:'strict',
                    //     expires:new Date(0)
                    //   })
                    //   return response
                    // }
                    if(payload.role!=='Teacher'){
                     return NextResponse.redirect(new URL("/login",request.url))
                    }
                  }
                 if(payload.role!=='Teacher'&&payload.role!=='Admin'){
                  return NextResponse.redirect(new URL("/login",request.url))
                 }
              } catch (error) {
                  return NextResponse.redirect(new URL("/login",request.url))
              }
        }
}
export const config = {
  matcher: [
    "/login",
    "/register",
    "/api/admin/:path*",
    "/admin/:path*",
    "/api/front-desk/:path*",
    "/front-desk/:path*",
    "/api/accountant/:path*",
    "/accountant/:path*",
    "/api/teacher/:path*",
    "/teacher/:path*"
  ],
}

function getJwtSecretKey() {
    const secret = process.env.AUTH_TOKEN;
    if (!secret) {
      throw new Error("JWT Secret key is not matched");
    }
    return new TextEncoder().encode(secret);
  }
 