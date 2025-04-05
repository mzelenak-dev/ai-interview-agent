"use client"

import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
}

const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIn = type === 'sign-in';
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if( type === 'sign-up') {
        console.log('SIGN-UP', values);
      } else if (type === 'sign-in') {
        console.log('SIGN-IN', values);
      } else {
        console.log('no type provided');
      }
    } catch(error) {
      console.error(error);
      toast.error(`Error: ${error}`);
    }
  }

  return (
    <section className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            height={32}
            width={38}
          />
          <h2 className="text-primary-100">PrepSmart</h2>
        </div>
        <h3 className="text-center">Practice job interview with AI</h3>
        
        <Form { ...form }>
          <form
            className="w-full space-y-6 mt-4 form"
            onSubmit={ form.handleSubmit(onSubmit) }
          >
            { !isSignIn && <p>Name</p> }
            <p>Email</p>
            <p>Password</p>
            <Button className="btn" type="submit">
              {isSignIn ? 'Sign In' : 'Create an Account'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'No Account Yet? ' : 'Have an Account already? '}
          <Link
            className="font-bold text-user-primary ml-1"
            href={ !isSignIn ? '/sign-in' : 'sign-up' }
          >
            {isSignIn ? 'Sign Up': 'Sign In'}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AuthForm