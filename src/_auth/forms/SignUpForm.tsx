import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import z from "zod"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signUpValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { UseUserContext } from "@/context/AuthContext"

const SignUpForm = () => {
  const { toast } = useToast()
  const {checkAuthUser} = UseUserContext();
  const navigate = useNavigate()

    const {mutateAsync:createUserAccount,isPending:isCreatingUser} = useCreateUserAccount();
    const {mutateAsync:signInAccount} = useSignInAccount();
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof signUpValidation>>({
      resolver: zodResolver(signUpValidation),
      defaultValues: {
        name:"",
        username: "",
        email: "",
        password: "",
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpValidation>) {
      const newUser = await createUserAccount(values)
     if(!newUser) {
      return    toast({
        title: "Sign Up Failed",
      });
     }

     const session = await signInAccount({
      email: values.email,
      password: values.password,
     });

        if(!session) {
          return  toast({
            title: "Sign Up Failed please try again",
          });
        }

      const isLoggedIn = await checkAuthUser();
      if(isLoggedIn) {
          form.reset();
          navigate('/');
      } else {
          toast({
            title: "Sign Up Failed please try again",
          });
      }

    }
  return (
      <Form {...form}>
          <div className="sm:w-[420] bg-red-500 flex items-center flex-col">
             <img src="/assets/images/logo.svg" alt="logo" />
             <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">create a new account</h2>
             <p className="text-light-3 small-medium md:base-regular mt-2">to use snapgram enter your account details</p>
         
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
               
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
               
                    <FormMessage />
                  </FormItem>
                )}
              />
                    <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="shad-input" {...field} />
                    </FormControl>
               
                    <FormMessage />
                  </FormItem>
                )}
              />
                    <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="shad-input" {...field} />
                    </FormControl>
               
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="shad-button_primary">
                {isCreatingUser ? 
                <div className="flex-center gap-2">
                     <Loader/>
                </div> : "Sign up"}
              </Button>
              <p className="text-small-regular text-light-2 text-center mt-2">already have an account 

              <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-3">Login</Link>
              </p>
            </form>
          </div>
      </Form>
  )
}

export default SignUpForm