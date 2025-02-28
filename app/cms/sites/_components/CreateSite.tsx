"use client"
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createSite, SiteResponse } from '@/utils/actions/sites/create-site';
import { UploadDropzone } from "@/utils/uploadthing"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { z } from "zod"

// Define a custom validation regex for subdomain
const subdomainRegex = /^[a-zA-Z0-9-]+$/;

const FormSchema = z.object({
	site_name: z.string().min(1, "Site name is required"),
	site_description: z.string().min(1, "Site description is required"),
	site_subdomain: z.string()
		.min(1, "Subdomain is required")
		.max(63, "Subdomain must be less than 64 characters")
		.regex(subdomainRegex, "Subdomain must only contain alphanumeric characters or hyphens"),
	site_cover_image: z.string().optional()
})

type FormValues = z.infer<typeof FormSchema>;

export default function CreateSite() {
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			site_name: "",
			site_description: "",
			site_subdomain: "",
			site_cover_image: ""
		}
	})

	const [open, setOpen] = useState<boolean>(false);
	const [logoUploadUrl, setLogoUploadUrl] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	async function onSubmit(data: FormValues) {
		try {
			setIsSubmitting(true);
			const response = await createSite(
				data.site_name,
				data.site_description,
				data.site_subdomain,
				logoUploadUrl
			);

			// Prüfen, ob response überhaupt existiert
			if (!response) {
				toast("Keine Antwort vom Server erhalten");
				return null;
			}

			// Prüfen, ob ein Fehler vorliegt
			if ('error' in response && response.error) {
				// Fehlercode für Eindeutigkeitsverletzung (Postgres)
				if (response.error.code === 23505 || response.error.code === '23505') {
					toast("Subdomain bereits vergeben, bitte wähle eine andere");
					return response;
				}

				// Allgemeine Fehlermeldung
				toast(response.error.message || "Ein Fehler ist aufgetreten");
				return response;
			}

			// Erfolgsfall
			toast("Site wurde erfolgreich erstellt!");
			form.reset();
			setOpen(false);
			setLogoUploadUrl("");
			return response;
		} catch (error) {
			console.error('Fehler bei der Erstellung der Site:', error);
			toast("Ein unerwarteter Fehler ist aufgetreten");
			return { error: { message: "Unerwarteter Fehler" } } as SiteResponse;
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Create</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a new site</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] mt-[0.5rem] space-y-3">
						<FormField
							control={form.control}
							name="site_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Site Name</FormLabel>
									<FormControl>
										<Input placeholder="Meine Website" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="site_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Site Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Beschreibung meiner Website" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="site_subdomain"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Site Subdomain</FormLabel>
									<FormControl>
										<div className='flex justify-center items-center gap-3 border rounded'>
											<Input
												{...field}
												className='border-none'
												placeholder='meine-domain'
											/>
											<span className="text-sm text-gray-500 pr-2">.{process.env.BASE_DOMAIN || 'domain.de'}</span>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex flex-col pt-[1rem]'>
							<div className='flex flex-col'>
								<Label>Logo</Label>
								<UploadDropzone
									className="p-8"
									endpoint="imageUploader"
									onClientUploadComplete={(res) => {
										if (res && res.length > 0 && res[0].url) {
											setLogoUploadUrl(res[0].url);
											toast(`Logo erfolgreich hochgeladen`);
										}
									}}
									onUploadError={(error: Error) => {
										toast(`Fehler beim Hochladen: ${error.message}`);
									}}
								/>
								{logoUploadUrl && (
									<div className="mt-2 text-sm text-green-600">Logo wurde hochgeladen</div>
								)}
							</div>
						</div>
						<div className="flex justify-end">
							<Button
								type="submit"
								size="sm"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Wird erstellt..." : "Erstellen"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
