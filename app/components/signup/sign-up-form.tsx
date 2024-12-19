import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { PasswordInput } from '../ui/password-input';
import { Button } from '../ui/button';
import { Link } from '@remix-run/react';

export default function SignUpForm() {
  type FormInput = z.infer<typeof formSchema>;
  const formSchema = z.object({
    email: z.string().email('Please enter in email address format.'),
    password: z
      .string()
      .min(6, 'Please enter a password of 6 characters or more.'),
  });
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (
    values: FormInput
  ): Promise<void> => {
    const signUpData = {
      email: values.email,
      password: values.password,
    };

    console.log(signUpData);
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="mb-2">Sign Up</CardTitle>
        <CardDescription className="leading-6">
          ポケモンをお気に入り登録するためのアカウントを発行します。
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input type="email" required {...field} />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <span className="text-xs ml-2">※at least 6 characters</span>
                  <FormControl>
                    <PasswordInput required {...field}></PasswordInput>
                  </FormControl>
                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-3 flex flex-col gap-7">
            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid}
            >
              Submit
            </Button>
            <Link className="text-sm hover:font-semibold" to={'/login'}>
              If you already have an account, click here.
            </Link>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
