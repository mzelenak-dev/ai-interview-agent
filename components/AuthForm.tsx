"use client"

import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import FormField from "./FormField"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp } from "@/lib/actions/auth.action"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
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
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if( type === 'sign-up') {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if(!result?.success) {
          toast.error(result?.message);
          return;
        }
        
        toast.success('Account created successfully. Please sign in.');
        router.push('/sign-in');
        
      } else if (type === 'sign-in') {
        toast.success('Sign in successful.');
        // simulate server response time delay to read toast
        setTimeout(() => {
          router.push('/');
        }, 500 );
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
          <h2 className="text-primary-100">CleverPrep</h2>
        </div>
        <h3 className="text-center">AI-Powered Interview Practice</h3>
        
        <Form { ...form }>
          <form
            className="w-full space-y-6 mt-4 form"
            onSubmit={ form.handleSubmit(onSubmit) }
          >
            { !isSignIn && (
              <>
                <FormField
                  name="name"
                  label="Name"
                  required={true}
                  control={form.control}
                  placeholder="Enter Your Name"
                />

                <FormField
                  name="phone"
                  label="Phone Number"
                  required={false}
                  control={form.control}
                  placeholder="Enter Your Phone Number"
                />
              </>
            )}

              <FormField
                name="email"
                label="Email"
                required={true}
                control={form.control}
                placeholder="Enter Your Email"
                type="email"
              />
              <FormField
                name="password"
                label="Password"
                required={true}
                control={form.control}
                placeholder="Enter Your Password"
                type="password"
              />

            <Button className="btn" type="submit">
              {isSignIn ? 'Sign In' : 'Create an Account'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'No Account Yet? ' : 'Have an Account already? '}
          <Link
            className="font-bold text-user-primary ml-1"
            href={ !isSignIn ? '/sign-in' : '/sign-up' }
          >
            {isSignIn ? 'Sign Up': 'Sign In'}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AuthForm