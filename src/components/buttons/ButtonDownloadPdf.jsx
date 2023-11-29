import { DownloadSimple } from "@phosphor-icons/react";
import { usePDF } from 'react-to-pdf';
import { Revenues } from "../../components/componentsMedic/Revenues";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function ButtonDownloadPdf() {
	const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
	return (
		<button
			onClick={() => toPDF()}
			className="flex cursor-pointer"
		>
			<DownloadSimple size={24} />
			<div ref={targetRef}>
				<Revenues />
			</div>
		</button>
	)
}