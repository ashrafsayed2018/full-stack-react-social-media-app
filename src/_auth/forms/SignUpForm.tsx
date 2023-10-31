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
import { Link } from "react-router-dom"

const SignUpForm = () => {

    const isLoading = true;
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
    function onSubmit(values: z.infer<typeof signUpValidation>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
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
                {isLoading ? 
                <div className="flex-center gap-2">
                     <Loader/>
                </div> : "Sign up"}
              </Button>
              <p className="text-small-regular text-light-2 text-center mt-2">already have an account 

              <Link to="sign-in" className="text-primary-500 text-small-semibold ml-3">Login</Link>
              </p>
            </form>
          </div>
      </Form>
  )
}

export default SignUpForm