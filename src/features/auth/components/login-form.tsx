"use client";
import { zodResolver} from "@hookform/resolvers/zod";
import {Image} from "next/image";
import {Link} from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Card, CardContent,CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Form, FormControl, FormField, FormItem,FormLabel,FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});
