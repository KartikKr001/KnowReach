"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companions.actions"
import { redirect } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {message: "Companion name must be at least 2 characters.",}),
  subject: z.string().min(2, {message: "Subject is required.",}),
  topic: z.string().min(2, {message: "topic is required.",}),
  voice:z.string().min(2, {message: "voice is required.",}),
  style:z.string().min(2, {message: "style is required.",}),
  // language:z.string().min(2, {message: "language is required.",}),
  duration:z.coerce.number().min(1, { message: "Duration is required.",}),
})

function CompanionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name : "",
      subject : "",
      topic : "",
      voice : "",
      style : "",
      // language : "",
      duration : 15,
    },
    mode:"onChange"
  })

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  const toastId = toast.loading("Creating your companion..."); 
  try {
    const companion = await createCompanion(values);
    redirect(`/companions/${companion.id}`);
  } 
  catch(e){
    console.error("Error creating companion", e);
    redirect("/");
  }
};




  return(
    <div>
      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter the companion name - ex: Calculus King" 
                  {...field} 
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select  
                  onValueChange={field.onChange} 
                  value={field.value} 
                  defaultValue={field.value}                >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((sub)=>(
                      <SelectItem value={sub} key={sub} className="input capitalize">{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should this companion teach?</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter the topic you want to learn - ex: Derivatives" 
                  {...field} 
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice Type</FormLabel>
              <FormControl>
                <Select  
                  onValueChange={field.onChange} 
                  value={field.value} 
                  defaultValue={field.value}                >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select Voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female" key="female" className="input capitalize">Female</SelectItem>
                    <SelectItem value="male" key="male" className="input capitalize">Male</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="style"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speaking Style</FormLabel>
              <FormControl>
                <Select  
                  onValueChange={field.onChange} 
                  value={field.value} 
                  defaultValue={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal" key="formal" className="input capitalize">Formal</SelectItem>
                    <SelectItem value="casual" key="casual" className="input capitalize">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select  
                  onValueChange={field.onChange} 
                  value={field.value} 
                  defaultValue={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english" key="english" className="input capitalize">English</SelectItem>
                    <SelectItem value="hindi" key="hindi" className="input capitalize">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          /> */}
          <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="15" 
                  {...field} 
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Build Your Companion"}
        </Button>

      </form>
    </Form>
    </div>
  );
}


export default CompanionForm