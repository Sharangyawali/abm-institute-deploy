import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'


export async function middleware(request,next) {    
const authToken=request.cookies.get('authToken')?.value
const role=request.cookies.get('role')?.value
// login and register as not needed if authToken and role in cookies
if(authToken&&role){
  if(request.nextUrl.pathname==='/login'|| request.nextUrl.pathname==='/register'){
    try {
      const {payload} = await jwtVerify(authToken, getJwtSecretKey());
      if(payload.role==='Admin'){
        return NextResponse.redirect(new URL("/admin/dashboard",request.url))
      }
      else if(payload.role==='FrontDesk'){
        return NextResponse.redirect(new URL("/front-desk/dashboard",request.url))
      }
    } catch (error) {
      console.log("error in token verification")
    }
  }
}
// Admin apis  protected routes
const protectedRoute1=request.nextUrl.pathname.startsWith('/api/admin/')||request.nextUrl.pathname.startsWith('/admin/')
const protectedRoute2=request.nextUrl.pathname.startsWith('/api/front-desk/')||request.nextUrl.pathname.startsWith('/front-desk/')
if(protectedRoute1){
  try {
          if(!authToken){
            return NextResponse.redirect(new URL("/login",request.url))
          }
            const {payload} = await jwtVerify(authToken, getJwtSecretKey());
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
             if(payload.role!=='FrontDesk'&&payload.role!=='Admin'){
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
    "/front-desk/:path*"
  ],
}

function getJwtSecretKey() {
    const secret = process.env.AUTH_TOKEN;
    if (!secret) {
      throw new Error("JWT Secret key is not matched");
    }
    return new TextEncoder().encode(secret);
  }
 